import client from '../database'
import bcrypt from 'bcrypt'
import hashing from '../utils/hashing'
import dotenv from 'dotenv'
dotenv.config()

export type User = {
    id?: number;
    email: string;
    user_name: string;
    password?: string;
    first_name?: string;
    last_name?: string;
}

class UserModel {
    formatUser(user: {
        id?: number | undefined;
        email: string;
        user_name: string;
        password?: string;
        first_name?: string;
        last_name?: string;
    }): User {
        return {
            id: user.id,
            email: user.email,
            user_name: user.user_name,
            first_name: user.first_name,
            last_name: user.last_name
        }
    }
    async create(usr: User): Promise<User> {
        try {
            const connection = await client.connect()
            const sql = 'insert into users (email, user_name, password, first_name, last_name) values ($1,$2,$3,$4,$5) returning email, user_name, password, first_name, last_name';
            const result = await connection.query(sql, [
                usr.email, usr.user_name, hashing(usr.password as string),
                usr.first_name, usr.last_name
            ])
            connection.release()
            return this.formatUser(result.rows[0])
        } catch (error) {
            throw new Error(`Sorry can't create user: ${usr.user_name}`)
        }
    }

    async index(): Promise<User[]> {
        try {
            const connection = await client.connect()
            const sql = 'select * from users';
            const result = await connection.query(sql)
            connection.release()
            return result.rows.map((u) => this.formatUser(u))
        } catch (error) {
            throw new Error(`Sorry we cant get users`)
        }
    }

    async edit(usr: User): Promise<User> {
        try {
            const connection = await client.connect()
            const sql = 'update users SET email=$1, user_name=$2, password=$3, first_name=$4, last_name=$5 where id=$6 returning *'
            const result = await connection.query(sql, [
                usr.email, usr.user_name, hashing(usr.password as string),
                usr.first_name, usr.last_name, usr.id
            ])
            connection.release()
            return this.formatUser(result.rows[0])
        } catch (error) {
            throw new Error(`Can not update user.`)
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const connection = await client.connect()
            const sql = 'delete from users where id=($1) returning *'
            const result = await connection.query(sql, [id])
            connection.release()
            return this.formatUser(result.rows[0])
        } catch (error) {
            throw new Error(`Could not delete user ${id}`)
        }
    }

    async show(id: Number): Promise<User> {
        try {
            const connection = await client.connect()
            const sql = 'select * from users where id=($1)'
            const result = await connection.query(sql, [id])
            connection.release()
            return this.formatUser(result.rows[0]);
        } catch (error) {
            throw new Error(`User ${id} does not exist`)
        }
    }
    async authenticate(nameOfUser: string, password: string): Promise<User | null> {
        try {
            const connection = await client.connect()
            const sql = 'select password from users where user_name=($1)'
            const result = await connection.query(sql, [nameOfUser])
            if (result.rows.length) {
                const { password: hashedPw } = result.rows[0];
                const validPassword = bcrypt.compareSync(`${password}${process.env.BCRYPT_PASSWORD}`, hashedPw)
                if (validPassword) {
                    const q = 'select * from users where user_name=($1)'
                    const userDetails = await connection.query(q, [nameOfUser])
                    return this.formatUser(userDetails.rows[0]);
                }
            }
            connection.release()
            return null
        } catch (error) {
            throw new Error(`Unable to authenticate user, ${error}`)
        }
    }
}


export default UserModel
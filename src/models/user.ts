import client from '../database'
import bcrypt from 'bcrypt'
import hashing from '../utils/hashing'

export type User = {
    id?: number;
    email: string;
    user_name: string;
    password?: string;
    first_name?: string;
    last_name?: string;
}

class UserModel {
    private formatUser(user: {
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
            return result.rows.map((user) => this.formatUser(user))
        } catch (error) {
            throw new Error(`Sorry we cant get users`)
        }
    }


}

export default UserModel
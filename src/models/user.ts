import client from '../database'
import bcrypt from 'bcrypt'
import hashing from '../utils/hashing'
import dotenv from 'dotenv'
import { User } from "../types";
dotenv.config()



class UserModel {
    cleaned_user(user: {
        id?: number | undefined;
        user_name?: string;
        first_name?: string;
        last_name?: string;
        password?: string;
    }): User {
        return {
            id: user.id,
            user_name: user.user_name,
            first_name: user.first_name,
            last_name: user.last_name,
        }
    }
    // Works
    async index(): Promise<User[]> {
        try {
            const connection = await client.connect()
            const sql = 'select * from users';
            const result = await connection.query(sql)
            connection.release()
            return result.rows.map((u) => this.cleaned_user(u))
        } catch (error) {
            throw new Error(`Sorry we cant get users`)
        }
    }

    // Works
    async show(id: Number): Promise<User> {
        try {
            const connection = await client.connect()
            const sql = 'select * from users where id=($1)'
            const result = await connection.query(sql, [id])
            connection.release()
            return this.cleaned_user(result.rows[0]);
        } catch (error) {
            throw new Error(`User ${id} does not exist`)
        }
    }
    // Works
    async create(usr: User): Promise<User> {
        try {
            const connection = await client.connect()
            const sql = 'insert into users (user_name, first_name, last_name, password) values ($1,$2,$3,$4) returning user_name, first_name, last_name, password';
            const result = await connection.query(sql, [usr.user_name, usr.first_name, usr.last_name, hashing(usr.password as string)])
            connection.release()
            return this.cleaned_user(result.rows[0])
        } catch (error) {
            throw new Error(`Sorry can't create user: ${usr.user_name}`)
        }
    }

    // Does not work
    async authenticate(usr: string, password: string): Promise<User | null> {
        try {
            const connection = await client.connect();
            const sql = 'SELECT password FROM users WHERE user_name=$1'
            const result = await connection.query(sql, [usr]);
            if (result.rows.length) {
                const {password: hashed} = result.rows[0];
                const validated = bcrypt.compareSync(`${password}${process.env.BCRYPT_PASSWORD}`, hashed);
                if (validated) {
                    const q = 'SELECT * FROM users WHERE user_name=($1)'
                    const userInfo = await connection.query(q, [usr]);
                    return this.cleaned_user(userInfo.rows[0]);
                }
            }
            connection.release();
            return null;
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
}

export default UserModel


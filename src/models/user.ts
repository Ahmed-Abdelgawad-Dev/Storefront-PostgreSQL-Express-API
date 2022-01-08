import client from "../database";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import {User} from "../types";
import {formatUser} from "../utils/formats";



dotenv.config()

const {SALT_ROUNDS, PEPPER} = process.env
export class UserModel {

    async index(): Promise<User[]> {
        try{
            const connection = await client.connect()
            const sql = 'select * from users;'
            const result = await connection.query(sql)
            connection.release()
            return result.rows.map((usr) => {
                return formatUser(usr.id, usr.user_name, usr.first_name, usr.last_name, usr.password)
            })
        }catch (e) {
            throw new Error(`${e}`)
        }
    }

    async create(usr: User): Promise<User> {
        try{
            const connection = await  client.connect()
            const sql =
                'insert into users (user_name, first_name, last_name, password) values ($1, $2, $3, $4) returning *;';
            const encryptedPassword = bcrypt.hashSync(usr.password + PEPPER, parseInt(SALT_ROUNDS as unknown as string))
            const result = await  connection.query(sql, [
                usr.user_name, usr.first_name, usr.last_name, encryptedPassword
            ])
            const {id, user_name, first_name, last_name, password} = result.rows[0]
            connection.release()
            return formatUser(id, user_name, first_name, last_name, password)
        }catch (e)  {
            // @ts-ignore
            throw new Error(`${usr.user_name} can not be created: ${e.message}`)
        }
    }

    async show(usr_id:  number): Promise<User> {
        try{
            const connection = await client.connect()
            const sql = 'select * from users where id=($1)'
            const result = await connection.query(sql,[usr_id])
            const {id, user_name, first_name, last_name, password} = result.rows[0]
            connection.release()
            return formatUser(id, user_name, first_name, last_name, password)
        }catch (e) {
            console.log(e)
            throw new Error(`${e}`)
        }
    }

    async authenticate(user_name: string, pw: string): Promise<null | User> {
        try{
            const connection = await client.connect()
            const sql = 'select * from users where user_name=($1);';
            const result = await connection.query(sql, [user_name]);
            let authentication: null | User = null
            if(result.rows.length) {
                const {id, user_name, first_name, last_name, password} = result.rows[0]
                const usr: User = formatUser(id, user_name, first_name, last_name, password)
                if(bcrypt.compareSync(pw + PEPPER, usr.password)) {authentication = usr}
            }
            return authentication
        } catch (e) {
            throw new Error(`The user: ${user_name} is not authenticated yet, ${e}`)
        }

    }
}


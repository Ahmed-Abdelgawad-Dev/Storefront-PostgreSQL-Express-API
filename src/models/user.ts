import client from "../database";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import {orderDetails, User} from "../types";
import {formatOrderDetails, formatUser} from "../utils/formats";



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
            const sql = 'select password from users where user_name=($1);';
            const result = await connection.query(sql, [user_name]);
            if (result.rows.length) {
                const usr = result.rows[0]
                if (bcrypt.compareSync(pw + PEPPER, usr.password)) {
                    return usr
                }
            }
            return null
        }catch (e) {
            // @ts-ignore
            throw new Error(`The user: ${user_name} is not authenticated yet, ${e.message}`)
        }
    }

    async removeProdInOrderByUser(usrId: number, prodId: number): Promise<orderDetails | undefined> {
        try{
            const connection = await client.connect()
            const usrOrderSQL = "select id from orders where user_id = ($1) and status = 'active';";
            const usrOrdResult = await connection.query(usrOrderSQL, [usrId])
            const ordId: number = usrOrdResult.rows[0].id
            if(ordId){
                const deleteProd =
                    'delete from order_details where order_id = ($1) and product_id = ($2) returning *;';
                const result = await connection.query(deleteProd, [ordId, prodId])
                const {id, product_id, quantity, order_id} = result.rows[0]
                connection.release()
                return formatOrderDetails(id, Number(product_id), quantity, Number(order_id))
            } else{
                connection.release()
            }
        }catch (e) {
            // @ts-ignore
            throw new Error(`${e.message}`)
        }
    }

    async addProdToOrderByUser(usrId: number, prodId: number, quant: number): Promise<orderDetails | undefined> {
        try{
            const connection = await client.connect()
            const sql = "select id from orders where user_id = ($1) and status = 'active';";
            const result = await connection.query(sql, [usrId])
            const ordId: number = result.rows[0].id
            if(ordId){
                const q =
                    await connection.query('insert into order_details (product_id, quantity, order_id) values ($1,$2,$3) returning *;'
                    , [prodId, quant, ordId])
                const {id, product_id, quantity, order_id} = q.rows[0]
                connection.release()
                return formatOrderDetails(id, Number(product_id), quantity, Number(order_id))
            }else{
                connection.release()
                console.log(`User ${prodId} has no orders active.`)
            }
        }catch (e) {
            throw new Error(`${e} - Product: ${prodId} can not be added.`)
        }
    }
}


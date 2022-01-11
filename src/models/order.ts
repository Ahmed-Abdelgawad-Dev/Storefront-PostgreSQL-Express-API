import client from "../database";
import {Order} from "../types";


export class OrderModel {
    async createOrder(ord: Order): Promise<Order> {
        try {
            const connection = await client.connect()
            const result = await connection.query(
                'insert into orders (status,user_id) values ($1, $2) returning *;',
                ['active', ord.userId]
            )
            const orderItem = result.rows[0]
            connection.release()
            return {id:orderItem.id, status: orderItem.status, userId: orderItem.user_id}
        
        } catch (e) {
            // @ts-ignore
            throw new Error(`Failed when creating an order: ${e.message}`)
        }
    }
}
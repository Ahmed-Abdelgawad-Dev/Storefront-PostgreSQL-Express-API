import client from "../database";
import {Order} from "../types";
import {formatOrder} from "../utils/formats";


export class OrderModel {
    async create(usrId: number): Promise<Order> {
        try {
            const connection = await client.connect()
            const userActiveOrder = await connection.query(
                "select id from orders where status = 'active' and user_id = ($1);",
                [usrId]
            )
            if (userActiveOrder.rows[0]) {
                connection.release()
                throw new Error(`This is a test error`)
            } else {
                const result = await connection.query(
                    'insert into orders (status,user_id) values ($1, $2) returning *;',
                    ['active', usrId]
                )
                const {id, status, user_id} = result.rows[0]
                connection.release()
                return formatOrder(id, status, Number(user_id))
            }
        } catch (e) {
            // @ts-ignore
            throw new Error(`Failed when creating order: ${e.message}`)
        }
    }
}
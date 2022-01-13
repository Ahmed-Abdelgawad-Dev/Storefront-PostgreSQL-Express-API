import client from "../database";
import {OrderDetails} from "../types";


export class OrderDetailsModel {
    async create(oD: OrderDetails): Promise<OrderDetails> {
        try{
            const connection = await client.connect()
            const result = await connection.query(
                "insert into order_details (product_id, quantity, order_id) values($1, $2, $3) returning *;",
                [oD.product_id, oD.quantity, oD.order_id]
            )
            connection.release()
            console.log(result.rows[0])
            return result.rows[0]
        }catch (e) {
            throw new Error(`${e}`)
        }
    }

    async index(order_id: number): Promise<OrderDetails[]> {
        try{
            const connection = await client.connect()
            const result = await connection.query(
                "select o.id as id, od.product_id, JSON_AGG(JSONB_BUILD_OBJECT('product_id', p.id, 'name', p.name, 'price', p.price, 'category', p.category, 'quantity', od.quantity)) as products from orders as o left join order_details as od on o.id = od.order_id left join products as p on od.product_id = p.id where o.id=$1 group by o.id, od.order_id, od.product_id;",
                [order_id]
            )
            connection.release()
            return result.rows.map((ord) => ord)
        }catch (e) {
            throw new Error(`${e}`)
        }
    }
    // NEED FIX
    async show(order_id: number, product_id: number): Promise<OrderDetails> {
        try{
            const connection = await client.connect()
            const result = await connection.query(
                'select od.order_id::integer as id, od.order_id::integer as "order_id", od.product_id::integer as "product_id", od.quantity, p.name, p.category, p.price::integer from order_details as od join products as p on p.id=od.product_id where order_id=$1 and product_id=$2;',
                [order_id, product_id]
            )
            connection.release()
            return result.rows[0]
        }catch (e) {
            throw new Error(`${e}`)
        }
    }
    // NEED FIX
    async update(oD: OrderDetails): Promise<OrderDetails> {
        try{
            const connection = await client.connect()
            const result = await connection.query(
                'update order_details set product_id=$1, quantity=$2,  order_id=$3 where id=$4 returning *',
                [oD.product_id,oD.quantity, oD.order_id, oD.id]
            )
            connection.release()
            return result.rows[0]
        }catch (e) {
            throw new Error(`${e}`)
        }
    }

    async delete(order_id: number, product_id: number): Promise<OrderDetails> {
        try{
            const connection = await client.connect()
            const result = await connection.query(
                'delete from order_details where order_id=($1) and product_id=($2) returning *;',
                [order_id, product_id]
            )
            connection.release()
            return result.rows[0]
        }catch (e) {
            throw new Error(`${e}`)
        }
    }
}
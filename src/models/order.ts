import client from "../database";
import {ProductsOrder} from "./order-product";

export interface Error {
    status?: number;
    name?: string;
    message?: string;
    stack?: string;
}

export type Order = {
    id?: number;
    status: string;
    userId: number;
    userName?: string;
    products?: ProductsOrder[]
}

class OrderModel {
    formatOrder(order: {
        id?: number | undefined;
        status: string;
        userid:  | number:
        user_name?: string;
        products: ProductsOrder[]
    }): Order {
        return {
            id: order.id,
            status: order.status,
            userId: order.userid,
            userName: order.user_name,
            products:
                Array.isArray(order.products)
                && order.products.length >= 1
                && order.products[0]?.quantity ? order.products : []
        }
    }
    async create(o: Order): Promise<Order> {
        try{
            const connection = await client.connect()
            const sql = 'insert into orders (status, userid) values ($1, $2) returning *'
            const result = await connection.query(sql, [o.status, o.userName])
            const order = result.rows[0]
            connection.release()
            return {id: order.id, status: order.status, userId: order.userid}
        } catch (e) {
            throw new Error ('Sorry we are not able to create the order')
        }
    }

    async index(): Promise<Order[]> {
        try {
            const connection = await client.connect()
            const sql = "SELECT o.id AS id, u.user_name, o.user_id, JSON_AGG(JSONB_BUILD_OBJECT('product_id', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products, o.status AS status FROM orders AS o LEFT JOIN products_order AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id GROUP BY o.id, u.user_name, o.status"
            const result = await connection.query(sql)
            connection.release()
            return result.rows.map((item) => this.formatOrder(item))
        }catch (e) {
            throw new Error('Sorry, we can not show the products')
        }
    }
}
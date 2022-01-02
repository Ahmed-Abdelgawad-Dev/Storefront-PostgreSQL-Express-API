import client from '../database'
import { Product } from './product'


export type ProductsOrder = {
    id?: number;
    product_id: number | string;
    order_id: number;
    quantity: number;
    products?: Product[];
}

class OrderProductModel {
    formatOrderProduct(ord: {
        id?: number | undefined;
        product_id: number | string;
        order_id: number;
        quantity: number;
        products: Product[];
    }): ProductsOrder {
        return {
            id: ord.id, product_id: ord.product_id, order_id: ord.order_id,
            quantity: ord.quantity,
            products:
                Array.isArray(ord.products) &&
                    ord.products.length >= 1 &&
                    ord.products[0].name ? ord.products : []
        }
    }

    async create(ord: ProductsOrder): Promise<ProductsOrder> {
        try {
            const connection = await client.connect()
            const sql = 'insert into products_order(product_id, order_id, quantity) values ($1, $2, $3) returning *'
            const result = await connection.query(sql, [ord.product_id, ord.order_id, ord.quantity])
            connection.release()
            return this.formatOrderProduct(result.rows[0])
        } catch (err) {
            throw new Error('Sorry the order is not created')

        }
    }
    async index(order_id: number): Promise<ProductsOrder[]> {
        try{
            const connection = await client.connect()
            const sql = "SELECT o.id AS id, op.order_id, op.product_id, JSON_AGG(JSONB_BUILD_OBJECT('product_id', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products FROM orders AS o LEFT JOIN products_order AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id WHERE o.id=$1 GROUP BY o.id, op.order_id, op.product_id"
            const result = await connection.query(sql, [order_id])
            connection.release()
            return result.rows.map((results) => this.formatOrderProduct(results))
        } catch (e) {
            throw new Error('Sorry cant show the products in the order, Something went wrong')
        }
    }

    async edit(ord:ProductsOrder): Promise<ProductsOrder> {
        try{
            const connection = await client.connect()
            const sql =
                'UPDATE products_order SET product_id=$1, order_id=$2, quantity=$3 WHERE id=$4 RETURNING *'
            const result = await connection.query(sql, [ord.product_id, ord.order_id, ord.quantity, ord.id])
            connection.release()
            return this.formatOrderProduct(result.rows[0])
        } catch (e) {
            throw new Error ('Sorry the product is not updated')
        }
    }

    async delete(order_id: number, product_id: number): Promise<ProductsOrder> {
        try {
            const connection = await client.connect()
            const sql = 'delete from products_order where product_id=($1) and order_id=($2) returning *'
            const result = await connection.query(sql, [product_id, order_id])
            connection.release()
            return this.formatOrderProduct(result.rows[0])
        } catch (e) {
            throw new Error('The product can not be deleted')
        }
    }
}


export default OrderProductModel
import client from "../database";
import {Product} from "../types";

export class ProductModel {
    async index(): Promise<Product[]> {
        try{
            const connection = await client.connect()
            const result = await connection.query('select * from products;')
            connection.release()
            return result.rows
        }catch (e) {
            // @ts-ignore
            throw new Error(`${e.message}`)
        }
    }

    async show(prodId: number): Promise<Product> {
        try{
            const connection = await client.connect()
            const result = await connection.query('select * from products where id = ($1)', [prodId])
            const items = result.rows[0]
            connection.release()
            return items
        }catch (e) {
            // @ts-ignore
            throw new Error(`${e.message}`)
        }
    }

    async create(product: Product): Promise<Product> {
        try{
            const connection = await client.connect()
            const result = await connection.query(
                'insert into products (name, price, category) values ($1,$2, $3) returning *;',
                [product.name, product.price, product.category]
            )
            const newItemProduct = result.rows[0]
            connection.release()
            return newItemProduct
        }catch (e) {
            // @ts-ignore
            throw new Error(`Product ${product.name} can not be add. - ${e.message}`)
        }
    }
        async delete(ID: number): Promise<Product> {
        try{
            const connection = await client.connect()
            const result = await connection.query(
                'delete from products where id = ($1) returning *;', [ID]
            )
            const deletedProduct = result.rows[0]
            connection.release()
            return deletedProduct
        }catch (e) {
            // @ts-ignore
            throw new Error(`Can not delete the item:  ${e.message}`)
        }
    }

    // async update(p: Product): Promise<Product> {
    //     try{
    //         const connection = await client.connect()
    //         const sql = 'UPDATE products SET name=$1, price=$2, category=$3 WHERE id=$4 RETURNING *;'
    //         const result = await connection.query(
    //             sql,
    //             [p.id, p.name, p.price, p.category]
    //         )
    //         const updatedItem = result.rows[0]
    //         connection.release()
    //         return updatedItem
    //     }catch (e) {
    //         // @ts-ignore
    //         throw new Error(`${e.message}`)
    //     }
    // }

}

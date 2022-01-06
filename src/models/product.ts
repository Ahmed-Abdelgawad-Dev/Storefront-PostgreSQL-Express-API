import client from '../database'

export type Product = {
    id?: number;
    name: string;
    price: number;
    category?: string;

}
class ProductModel {
    clean_product(product: {
        id?: number | undefined;
        name: string;
        price: number;
        category: string;


    }): Product {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category
        }
    }

    async index(): Promise<Product[]> {
        try {
            const connection = await client.connect()
            const sql = 'select * from products'
            const result = await connection.query(sql)
            connection.release()
            return result.rows.map((prod) => this.clean_product(prod))
        } catch (error) {
            throw new Error(`NO products found`)
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            const connection = await client.connect()
            const sql = 'insert into products (name, price,category) values($1,$2,$3) returning *'
            const result = await connection.query(sql,
                [product.name, product.price, product.category]
            )
            connection.release()
            return this.clean_product(result.rows[0])
        } catch (e) {
            throw new Error('Sorry: No product created')
        }
    }


}

export default ProductModel
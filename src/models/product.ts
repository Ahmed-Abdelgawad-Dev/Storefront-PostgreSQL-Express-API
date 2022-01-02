import client from '../database'

export type Product = {
    id?: number;
    name: string;
    description: string;
    category: string;
    price: number;
}
class ProductModel {
    formatProduct(product: {
        id?: number | undefined;
        name: string;
        description: string;
        category: string;
        price: number;

    }): Product {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,


        }
    }
    async create(product: Product): Promise<Product> {
        try {
            const connection = await client.connect()
            const sql = 'insert into products (name, price,category, description) values($1,$2,$3,$4) returning *'
            const result = await connection.query(sql,
                [product.name, product.description, product.category, product.price]
            )
            connection.release()
            return this.formatProduct(result.rows[0])
        } catch (error) {
            throw new Error('Sorry: No product created')
        }
    }

    async index(): Promise<Product[]> {
        try {
            const connection = await client.connect()
            const sql = 'select * from products'
            const result = await connection.query(sql)
            connection.release()
            return result.rows.map((prod) => this.formatProduct(prod))
        } catch (error) {
            throw new Error(`NO products found`)
        }
    }
    async edit(product: Product): Promise<Product> {
        try {
            const connection = await client.connect()
            const sql = 'update products set name=$1, description=$2, category=$3, price=$4 returning *'
            const result = await connection.query(sql[
                product.name, product.description, product.category, product.price
            ])
            connection.release()
            return this.formatProduct(result.rows[0])
        } catch (error) {
            throw new Error(`Something went wrong`)
        }

    }

    async delete(id: number): Promise<Product> {
        try {
            const connection = await client.connect()
            const sql = 'drop from products where id=($1) returning *'
            const result = await connection.query(sql[id])
            connection.release()
            return this.formatProduct(result.rows[0])
        } catch (error) {
            throw new Error(`Sorry, product did not get deleted yet, plz try again.`)
        }

    }

    async show(id: number): Promise<Product> {
        try {
            const connection = await client.connect()
            const sql = 'select * from products where id=($!'
            const result = await connection.query(sql[id])
            connection.release()
            return this.formatProduct(result.rows[0])
        } catch (error) {
            throw new Error(`The product is not available at the moment`)
        }

    }
}


export default ProductModel
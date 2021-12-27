import { Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const {
    NODE_ENV,
    DATABASE_PORT,
    DATABASE_HOST,
    DATABASE_NAME,
    DATABASE_NAME_TEST,
    DATABASE_USER,
    DATABASE_PASSWORD,
} = process.env

const client = new Pool({
    host: DATABASE_HOST,
    database: NODE_ENV === 'dev' ? DATABASE_NAME : DATABASE_NAME_TEST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    port: parseInt(DATABASE_PORT as string, 10)
})

export default client
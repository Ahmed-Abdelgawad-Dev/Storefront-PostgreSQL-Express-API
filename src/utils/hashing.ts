import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()
const { DATABASE_PASSWORD, BCRYPT_PASSWORD, SALT_ROUNDS } = process.env

const hashing = (_password: string) => {
    const salt = parseInt(SALT_ROUNDS as unknown as string, 10)
    return bcrypt.hashSync(`${DATABASE_PASSWORD}${BCRYPT_PASSWORD}`, salt)
}

export default hashing
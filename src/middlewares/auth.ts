import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
dotenv.config()

const { TOKEN_SECRET } = process.env

interface Error {
    status?: number;
    name?: string;
    message?: string;
}

const authError = (next: NextFunction) => {
    const error: Error = new Error('Please try to login again!')
    error.status = 401
    next(error)
}

const validatingToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (authorizationHeader) {
            const bearer = authorizationHeader.split(' ')[0].toLowerCase()
            const token = authorizationHeader.split(' ')[1]
            if (bearer && token == 'bearer') {
                const decoded = jwt.verify(token, TOKEN_SECRET as unknown as string)
            } else { authError(next) }
        } else { authError(next) }
    } catch (error) {
        authError(next)
    }
}

export default validatingToken
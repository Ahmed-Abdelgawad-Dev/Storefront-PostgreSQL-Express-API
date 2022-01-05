import { Request, Response, NextFunction } from 'express'


interface Error {
    status?: number;
    name?: string;
    message?: string;
    stack?: string;
}

const errorMiddleware = (error: Error, _req: Request, response: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong, Sorry!'
    response.status(status).json({
        status: 'Error',
        message
    })
    next()
}

export default errorMiddleware
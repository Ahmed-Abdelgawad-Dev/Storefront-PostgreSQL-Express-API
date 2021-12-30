import { Request, Response, Router, NextFunction } from 'express'
import UserModel from '../../models/user'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import validatingToken from '../../middlewares/auth'

dotenv.config()
const { TOKEN_SECRET } = process.env

const routes = Router()
const userModel = new UserModel()

routes.post('/', validatingToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await userModel.create(req.body)
            const token = jwt.sign({ user }, TOKEN_SECRET as unknown as string)
            res.json({
                status: 'success', data: { ...user, token },
                message: 'A new user has been created.'
            })
        } catch (error) {
            next(error)
        }
    }
)

routes.get('/', validatingToken, async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userModel.index()
        res.json({
            status: 'success', data: { users },
            message: 'Successfully invoked users'
        })
    } catch (error) {
        next(error)
    }
})

export default routes
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
            console.log(token)
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

routes.get('/:id', validatingToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.show(req.params.id as unknown as number)
        res.json({ status: 'success', data: { user }, message: 'Successfully invoked user.' })
    } catch (error) {
        next(error)
    }
})

routes.patch('/:id', validatingToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.edit(req.body)
        res.json({ status: 'success', data: { user }, message: 'Successfully updated user.' })
    } catch (error) {
        next(error)
    }
})

routes.delete('/:id', validatingToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usr = await userModel.delete(req.params.id as unknown as number)
        res.json({ status: 'success', data: { usr }, message: 'Successfully deleted user.' })
    } catch (error) {
        next(error)
    }
})

routes.post('/authenticate', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_name, password } = req.body
        const usr = await userModel.authenticate(user_name, password)
        const token = jwt.sign({ usr }, TOKEN_SECRET as unknown as string)
        if (!usr) {
            return res.json({
                status: 'success', message: 'Please enter valid username and password'
            })
        } else {
            return res.json({
                status: 'success', data: { ...usr, token },
                message: 'Successfully authed user',
            })
        }
    }
    catch (error) {
        return next(error)
    }
})

export default routes
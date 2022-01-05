import { Request, Response, Router, NextFunction } from 'express'
import UserModel from '../../models/user'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import authMiddleware from '../../middlewares/authMiddleware'


dotenv.config()
const { TOKEN_SECRET } = process.env

const routes = Router()
const userModel = new UserModel()

routes.post('/create',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await userModel.create(req.body)
            const token = jwt.sign({ user }, TOKEN_SECRET as unknown as string)
            res.json({
                status: 'success', data: { ...user, token },
                message: `A new user: ${user.user_name} has been created.`
            })
        } catch (error) {
            next(error)
        }
    }
)

routes.get('/', async (_req: Request, res: Response, next: NextFunction) => {
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

routes.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.show(req.params.id as unknown as number)
        res.json({ status: 'success', data: { user }, message: 'Successfully invoked user.' })
    } catch (error) {
        next(error)
    }
})

routes.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.edit(req.body)
        res.json({ status: 'success', data: { user }, message: 'Successfully updated user.' })
    } catch (error) {
        next(error)
    }
})

routes.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
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
        const user = await userModel.authenticate(user_name, password)
        const token = jwt.sign({ user }, TOKEN_SECRET as unknown as string)
        if (!user) {
            return res.json({
                status: 'success', message: 'Please enter valid username and password'
            })
        } else {
            return res.json({
                status: 'success', data: { ...user, token },
                message: 'Successfully authed user',
            })
        }
    }
    catch (e) {
        return next(e)
    }

  //   try {
  //       const {user_name, password} = req.body
  //       const user = await userModel.authenticate(user_name, password)
  //       let token = jwt.sign({ user }, TOKEN_SECRET as unknown as string);
  //       res.json(token)
  // } catch(e) {
  //     res.status(401)
  //     res.json({ e })
  // }

})

export default routes
import { Router } from 'express'
import userRoutes from './API/users'
import productsRoutes from './API/products'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/products', productsRoutes)


export default routes
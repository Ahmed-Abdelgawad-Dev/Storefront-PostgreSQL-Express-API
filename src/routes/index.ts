import { Router } from 'express'
import userRoutes from './API/users'
import productsRoutes from './API/products'
import ordersRoutes from './API/orders'
import orderProductsRoutes from './API/order-products'
import validatingToken from "../middlewares/authMiddleware";


const routes = Router()

routes.use('/users', userRoutes)
routes.use('/products',validatingToken, productsRoutes)
routes.use('/orders',validatingToken, ordersRoutes)
routes.use('/order-products',validatingToken, orderProductsRoutes)


export default routes
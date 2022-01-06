import { Request, Response, Router, NextFunction } from 'express'
import ProductModel from '../../models/product'

const routes = Router()
const productModel = new ProductModel()


routes.get('/products', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productModel.index()
        res.json({ status: 'status', data: { products }, message: 'Products reached' })
    } catch (e) {
        next(e)
    }
})

routes.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productModel.create(req.body)
        res.json({ status: 'status', data: { ...product }, message: 'Product created' })
    } catch (error) {
        next(error)
    }
})



export default routes

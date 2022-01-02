import { Request, Response, Router, NextFunction } from 'express'
import ProductModel from '../../models/product'

const routes = Router()
const productModel = new ProductModel()

routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productModel.create(req.body)
        res.json({ status: 'status', data: { ...product }, message: 'Product created' })
    } catch (error) {
        next(error)
    }
})

routes.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productModel.index()
        res.json({ status: 'status', data: { ...products }, message: 'Products reached' })
    } catch (error) {
        next(error)
    }
})

routes.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productModel.show(req.params.id as unknown as number)
        res.json({ status: 'success', data: { product }, message: "Retrieved product" })
    } catch (error) {
        next(error)
    }
})

routes.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productModel.edit(req.body)
        res.json({ status: 'success', data: { product }, message: "updated product" })
    } catch (error) {
        next(error)
    }
})

routes.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productModel.show(req.params.id as unknown as number)
        res.json({ status: 'success', data: { product }, message: "Product was deleted" })
    } catch (error) {
        next(error)
    }

})



export default routes
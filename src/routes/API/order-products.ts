import OrderProductModel from "../../models/order-product";
import {Request, Response, Router, NextFunction} from "express";

const routes = Router()
const orderProductModel = new OrderProductModel()

routes.post('/:id', async(request: Request, response: Response, next: NextFunction)=>{
    try{
        const ordProd = await orderProductModel.create(request.body)
        response.json({status: 'success', data: {...ordProd}, message: 'OrderProdcut created'})
    }catch (e) {
        next(e)
    }
})

routes.get('/:id/products', async(request: Request, response: Response, next: NextFunction) => {
    try {
        const ordProd = await orderProductModel.index(request.params.id as unknown as number)
        response.json({status: 'success', data: {ordProd}, message: 'Order Prodcut created'})
    } catch (e) {
        next(e)
    }
})

routes.patch('/:id/products/:id', async(request: Request, response: Response, next: NextFunction) => {
    try {
        const ordProd = await orderProductModel.edit(request.body)
        response.json({status: 'success', data: {ordProd}, message: 'Order Prodcut created'})
    } catch (e) {
        next(e)
    }
})


routes.delete('/:id/products/:id', async(request: Request, response: Response, next: NextFunction) => {
    try {
        const ordProd = await orderProductModel.delete(request.body.product_id, request.body.order_id)
        response.json({status: 'success', data: {ordProd}, message: 'products order has been deleted'})
    } catch (e) {
        next(e)
    }
})

routes.get('/:id/products/:id', async(request: Request, response: Response, next: NextFunction) => {
    try {
        const ordProd = await orderProductModel.show(request.body.product_id, request.body.order_id)
        response.json({status: 'success', data: {ordProd}, message: 'products order has been deleted'})
    } catch (e) {
        next(e)
    }
})

export default routes
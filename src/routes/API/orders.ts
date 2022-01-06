// import {Request, Response, Router, NextFunction} from "express";
// import OrderModel from "../../models/order";
//
//
// const routes = Router()
// const orderModel = new OrderModel()
//
// routes.post('/', async(request:Request, response: Response, next: NextFunction) =>{
//     try {
//         const orderItem = await orderModel.create(request.body)
//         response.json({status: 'status', data:{...orderItem}, message: 'Created order'})
//     }catch (e) {
//         next(e)
//     }
// })
//
// routes.get('/', async(request:Request, response: Response, next: NextFunction)=>{
//     try{
//         const allOrders = await orderModel.index()
//         response.json({status: 'success', data:{...allOrders}, message:'recieved all orders'})
//     }catch (e) {
//         next(e)
//     }
// })
//
// routes.get('/:id', async(request:Request, response: Response, next: NextFunction)=>{
//     try{
//         const orderItem = await orderModel.show(request.params.id as unknown as number)
//         response.json({status:'success', data: {orderItem}, message: 'Order has been shown'})
//     }catch (e) {
//         next(e)
//     }
// })
//
// routes.get('/users/:id', async(request:Request, response: Response, next: NextFunction)=>{
//     try{
//         const orderItem = await orderModel.orderByUserId(request.params.id as unknown as number)
//         response.json({status:'success', data: {orderItem}, message: 'Order has been retrieved'})
//     }catch (e) {
//         next(e)
//     }
// })
//
// routes.patch('/:id', async(request:Request, response: Response, next: NextFunction)=>{
//     try{
//         const orderItem = await orderModel.edit(request.body)
//         response.json({status:'success', data: {orderItem}, message: 'Order has been edited'})
//     }catch (e) {
//         next(e)
//     }
// })
//
//
// routes.patch('/:id', async(request:Request, response: Response, next: NextFunction)=>{
//     try{
//         const orderItem = await orderModel.delete(request.params.id as unknown as number)
//         response.json({status:'success', data: {orderItem}, message: 'Order has been deleted'})
//     }catch (e) {
//         next(e)
//     }
// })
//
// export default routes
import {Request, Response, Application} from "express";
import {OrderModel} from "../models/order";

const orderModel = new OrderModel()

const create = async (request: Request, response: Response) => {
    try{
        const createdOrder = await orderModel.createOrder(request.body)
        response.json(createdOrder)
    } catch (e) {
        response.status(500).send(`${e}`)
    }
}

export const ordersRouter = (app: Application): void =>{
    app.post('/orders/create', create)
}
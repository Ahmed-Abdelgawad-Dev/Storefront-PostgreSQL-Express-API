import {Request, Response, Application} from "express";
import {OrderModel} from "../models/order";

const orderModel = new OrderModel()

const create = async (request: Request, response: Response) => {
    try{
        const usrId = request.body.usrId
        const createdOrder = await orderModel.create(usrId)
        response.json(createdOrder)
    } catch (e) {
        response.status(500).send(`${e}`)
    }
}


export const ordersRouter = (app: Application): void =>{
    app.post('/orders/create', create)
}
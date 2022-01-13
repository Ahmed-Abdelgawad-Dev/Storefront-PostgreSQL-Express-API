import express, {Request, Response} from "express";
import {OrderDetailsModel} from "../models/orderDetails";
import {verifyToken} from "../utils/jwtAuth";


const orderDetailsModel = new OrderDetailsModel()

const create = async (request: Request, response: Response) => {
    try{
        const detailsOfOrder = await orderDetailsModel.create(request.body)
        return response.json(detailsOfOrder)
    }catch (e) {
        response.status(500).send(`${e}`)
    }
}

const index = async (request: Request, response: Response) => {
    try{
        const ordDetails = await orderDetailsModel.index(request.params.id as unknown as number)
        response.json(ordDetails)
    }catch (e) {
        response.status(500).send(`${e}`)
    }
}
// NEED FIX
const show = async (request: Request, response: Response) => {
    try{
        const ordDetails = await orderDetailsModel.show(request.body.order_id, request.body.product_id)
        console.log(ordDetails)
        response.json(ordDetails)
    }catch (e) {

        response.status(500).send(`${e}`)
    }
}

// NEED FIX
const update = async (request: Request, response: Response) => {
    try {
        const ordDetails = await orderDetailsModel.update(request.body)
        console.log(ordDetails)
        response.json(ordDetails)
    } catch (e) {

        response.status(500).send(`${e}`)
    }
}

const destroy = async (request: Request, response: Response) => {
    try{
        const ordDetails = await orderDetailsModel.delete(request.body.order_id, request.body.product_id)
        console.log(ordDetails)
        response.json(ordDetails)
    }catch (e) {

        response.status(500).send(`${e}`)
    }
}

export const orderDetailsRouter = (app: express.Application): void => {
    app.post('/order-details/create',verifyToken, create)
    app.get('/order-details/:id/products',verifyToken, index)
    app.get('/order-details/:id/products/:id',verifyToken, show)              // pending
    app.patch('/order-details/:id/products/:id',verifyToken, update)    // pending
    app.delete('/order-details/:id/products/:id',verifyToken, destroy)  // pending
}
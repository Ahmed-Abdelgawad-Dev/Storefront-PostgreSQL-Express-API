import express, {Request, Response} from "express";
import {Product} from "../types";
import {ProductModel} from "../models/product";

const productModel = new ProductModel()

const index = async (_request: Request, response: Response) => {
    try{
        const items =await productModel.index()
        response.json(items)
    }catch (e) {
        response.status(500).send(`${e}`)
    }
}

const show = async (_request: Request, response: Response) => {
    try{
        const items =await productModel.show(parseInt(_request.params.id))
        response.json(items)
    }catch (e) {
        response.status(500).send(`${e}`)
    }
}

const createProduct = async (request: Request, response: Response) => {
    try{
        const prodDetails: Product = {name: request.body.name, price: request.body.price, category: request.body.category}
        const newProduct = await productModel.create(prodDetails)
        response.json(newProduct)
    }catch (e) {
        response.status(500).send(`${e}`)
    }
}

const deleteProduct = async (request: Request, response: Response) => {
    try{
        const deletedProd = await productModel.delete(parseInt(request.params.id))
        response.json(deletedProd)
    }catch (e) {
        response.status(500).send(`${e}`)
        // throw new Error(`Cant delete : ${e}`)
    }
}

// const updateProduct = async (request: Request, response: Response) => {
//     try{
//         const updatedProd = await productModel.update(request.body)
//         response.json({
//             name: updatedProd.name,
//             price: updatedProd.price,
//             category: updatedProd.category
//         })
//     }catch (e) {
//         // response.status(500).send(`${e}`)
//         throw new Error(`Cant update : ${e}`)
//     }
// }

export const productsRouter = (app: express.Application): void => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products/create', createProduct)
    app.delete('/products/delete/:id', deleteProduct)
    // app.patch('/products/update/:id', updateProduct)
}
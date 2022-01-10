import express, {NextFunction, Request, Response} from "express";
import {UserModel} from "../models/user";
import {User} from "../types";
import {createToken, verifyToken} from "../utils/jwtAuth";

const userModel = new UserModel()

export const index = async (_req:Request, res: Response) => {
    try{
      const users = await userModel.index()
      res.json(users)
    } catch (e) {
        //@ts-ignore
        res.status(500).send(`${e.message}`)
    }
}

export const create = async (req:Request, res: Response, next: NextFunction) => {
        const usrDetails: User = {
            user_name: req.body.user_name, first_name: req.body.first_name,
            last_name: req.body.last_name, password: req.body.password
        }
        try{
            const usr= await userModel.create(usrDetails)
            res.json(createToken(usr.user_name))
            next()
        }catch (e) {
            // @ts-ignore
            res.status(500).send(`${e.message}`)

        }
}

export const edit = async (req:Request, res: Response, next: NextFunction) => {
        try{
            const usr= await userModel.edit(req.body)
            res.json(createToken(usr.user_name))
            next()
        }catch (e) {
            // @ts-ignore
            res.status(500).send(`${e.message}`)

        }
}

export const del = async (req:Request, res: Response, next: NextFunction) => {
        try{
            const usr= await userModel.delete(req.params.id as unknown as number)
            res.json(usr)
            next()
        }catch (e) {
            // @ts-ignore
            res.status(500).send(`${e.message}`)

        }
}

export const show = async(req: Request, res: Response) => {
    try{
        const usr = await userModel.show(parseInt(req.params.id))
        res.json(usr)
    }catch (e) {
        // @ts-ignore
        res.status(500).send(`${e.message}`)

    }
}

export const authenticate = async (req: Request, res: Response) => {
    try{
        const usr = await userModel.authenticate(req.body.user_name, req.body.password)
        if(usr) {
            res.json(createToken(usr.user_name))
            // res.json(usr.user_name)
        } else{res.send('Please enter a valid user name and password.')}
    }catch (e) {
        // @ts-ignore
        res.status(500).send(`${e.message}`)
    }
}

export const usersRouter = (app: express.Application): void => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users/create', create)
    app.post('/users/auth',  authenticate)
    app.patch('/users/edit', edit)
    app.delete('/users/del/:id', del)
}
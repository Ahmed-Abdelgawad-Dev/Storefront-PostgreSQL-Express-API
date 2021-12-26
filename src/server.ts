import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (_req: Request, res: Response) {
    res.send('Main API root Endpoint!!!')
})

app.listen(3000, function () {
    console.log(`Server is running on port: ${address}`)
})

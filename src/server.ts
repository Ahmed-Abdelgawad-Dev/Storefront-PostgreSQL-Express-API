import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv'
import routes from './routes'
import errorMiddleware from './middlewares/errorMiddleware'

const app: express.Application = express()

// Securing env vars
dotenv.config()
const PORT = process.env.PORT || 3000
const address: string = `0.0.0.0:${PORT}`

app.use(express.json());

// app.use(express.urlencoded());

// Middle wares
// app.use(bodyParser.json())

// Cors => allowed whitelist | any | specific opt
app.use(cors())
//Security
app.use(helmet())
//HTTP logger
app.use(morgan('dev'))

app.get('/', function (_req: Request, res: Response) {
    res.send('Main API root Endpoint!!!')
})

app.use('/api', routes)
app.use(errorMiddleware)

app.listen(3000, function () {
    console.log(`Server is running on port: ${address}`)
})

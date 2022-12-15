import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { authRouter } from './routes/v1/auth.routes'
import { productRouter } from './routes/v1/product.routes'
import { appInit } from './service/auth.service'

/* ----------------------------- Initialization ----------------------------- */
dotenv.config()
const app = express();

/* --------------------------------- Sttings -------------------------------- */
const prefix = process.env.prefix || '/api';
const port = process.env.PORT || 3000;

/* ------------------------------- Middleware ------------------------------- */
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

/* --------------------------------- Routes --------------------------------- */
app.use(`${prefix}/v1/auth`, authRouter)
app.use(`${prefix}/v1/product`, productRouter)


/* ------------------------------- Run server ------------------------------- */
app.listen( port, () => {
    appInit()
    console.log( `Server listen on port: ${ port }` );
} );
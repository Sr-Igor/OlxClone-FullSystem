import express, { ErrorRequestHandler, Request, Response } from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import { mongoConnect } from './instances/mongo'

import ApiRoutes from './routes/routes'

dotenv.config();
mongoConnect();

const server = express()

server.use(express.static(path.join(__dirname, "../public")))
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.use(passport.initialize())
server.use(ApiRoutes)

server.use((req: Request, res: Response)=> {
    res.status(404);
    res.json({ error: 'Not Found.' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    err.status ? res.status(err.status) : res.status(400)
    err.message ? res.json({error: err.message}) : res.json({error: "Something is wrong"})
}

server.use(errorHandler)
server.listen(process.env.PORT || 3000)
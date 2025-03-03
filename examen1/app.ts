import 'dotenv/config'
import express from 'express'
import {Request, Response} from 'express'
import webhookRouter from "./src/routes/webhook.router";
import usersRouter from "./src/routes/users.router";
import authRouter from "./src/routes/auth.router";
import placesRouter from "./src/routes/places.router";

import passport from "passport";
import {passportConfig} from "./src/auth";

passportConfig(passport)

const port = process.env.PORT || 3000

const app = express()
app.use('/webhook', webhookRouter )
app.use(express.json())

app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/places', placesRouter)

app.get('/test', async(req: Request, res: Response) => {
    res.json({message: 'Hello World'})
})

app.listen(port, () => {
    console.log('Server running on port ', port)
})
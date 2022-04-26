import express from 'express';
import userRouter from './controller/userController';

const app = express()

app.use(express.json())

app.use(userRouter)

app.listen(3000, () => console.log("Server listening on port 3000..."));
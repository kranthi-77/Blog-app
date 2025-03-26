import express from "express";
import './config/dotenv.js';
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRoute.js";
import commentRouter from "./routes/commentRoute.js";
import webhookRouter from "./routes/webhookRoute.js";
import { clerkMiddleware,requireAuth } from '@clerk/express'
import cors from 'cors'

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(clerkMiddleware())

app.use('/webhooks',webhookRouter)

app.use(express.json())

app.use('/users',userRouter)
app.use('/posts',postRouter)
app.use('/comments',commentRouter)

app.use((error,req,res,next)=>{
  res.status(error.status || 500);
    res.json({
        message:error.message || "something went wrong",
        status:error.status,
        stack: error.stack,
    })
})
app.listen(3000,()=>{
    connectDB()
    console.log("serve is running")
})
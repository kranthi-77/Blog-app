import express from "express";
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();

import connectDB from "../config/db.js";
import userRouter from "../routes/userRoute.js";
import postRouter from "../routes/postRoute.js";
import commentRouter from "../routes/commentRoute.js";
import webhookRouter from "../routes/webhookRoute.js";
import { clerkMiddleware } from '@clerk/express'
import serverless from "serverless-http";

const app = express()

try {
  await connectDB();
} catch (err) {
  console.error("MongoDB connection error:", err);
}


app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  credentials: true 
}))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});


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

// app.listen(3000,()=>{
//     connectDB()
//     console.log("serve is running")
// })

export default serverless(app);

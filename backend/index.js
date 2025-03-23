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

app.use(cors(process.env.CLIENT_URL))

app.use(clerkMiddleware())

app.use('/webhooks',webhookRouter)

app.use(express.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
// app.get("/protect2", requireAuth(), (req, res) => {
// res.status(200).json("content")
// });


app.use('/users',userRouter)
app.use('/posts',postRouter)
app.use('/comments',commentRouter)

app.use((error,req,res,next)=>{
    res.json({
        message:error.message || "something went wrong",
        status:error.status
    })
})
app.listen(3000,()=>{
    connectDB()
    console.log("serve is runs")
})
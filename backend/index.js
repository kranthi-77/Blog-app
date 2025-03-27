import express from "express";
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();

import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRoute.js";
import commentRouter from "./routes/commentRoute.js";
import webhookRouter from "./routes/webhookRoute.js";
import { clerkMiddleware } from '@clerk/express'
import serverless from "serverless-http";

const app = express()

try {
  await connectDB();
} catch (err) {
  console.error("MongoDB connection error:", err);
}


app.use(cors({
  origin: /\.your-app\.vercel\.app$/, 
  credentials: true
}))


app.use(clerkMiddleware())

app.use('/webhooks',webhookRouter)

app.use(express.json())

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

app.use((error,req,res,next)=>{
  res.status(error.status || 500);
    res.json({
        message:error.message || "something went wrong",
        status:error.status,
        stack: error.stack,
    })
})

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

// Export for Vercel serverless
export default app
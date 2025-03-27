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

const allowedOrigins = [
  "https://blog-app-frontend-henna.vercel.app", // ✅ your frontend domain
  "http://localhost:3000"             // ✅ for local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
    allowedHeaders: ["Content-Type", "Authorization"], 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  })
);

try {
  await connectDB();
} catch (err) {
  console.error("MongoDB connection error:", err);
}





app.use(clerkMiddleware())

app.use('/webhooks',webhookRouter)

app.use(express.json())

app.get("/api/test", (req, res) => {
  res.json({ message: "CORS works on Vercel!" });
});

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


export default app
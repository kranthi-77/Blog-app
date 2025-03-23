import express from "express";
import { clerkWebHook } from "../controllers/webHookController.js";
import bodyParser from "body-parser";

const router = express.Router()

router.post("/clerk", (req,res,next)=>{
  console.log("Webhook route POST hit");
},
    bodyParser.raw({ type: "application/json" }),
    clerkWebHook
  );
  
  export default router; 
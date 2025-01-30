import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouts from "./routes/authRouts.js";
import bookRouter from "./routes/bookRouter.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", authRouts);
app.use("/api/books",bookRouter)
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL,).then(()=>app.listen(PORT,()=>
    console.log(`server is running on port ${PORT}`)
)).catch((error)=> console.log(error));




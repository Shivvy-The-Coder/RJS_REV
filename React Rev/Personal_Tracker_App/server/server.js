import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser  from "cookie-parser";
import connectDB from "./config/mongodb.js";

const app = express();
const port = process.env.port || 4000;
connectDB();

app.use(express.json()) //all the request will be passd through json 
app.use(cookieParser());
app.use(cors({credentials:true})) //credentials true so that we can send cookies in the response from the express app



app.get("/",(req,res)=>{
    res.send("API Working");
})
app.listen(port , (req,res)=>
{
    console.log(`Application is running on Port ${port}`);
})


// mongodb+srv://aspershdex:<db_password>@cluster0.h5pgcxk.mongodb.net
import express from "express";
import cors from "cors"; // for connecting the backend with frontend
import 'dotenv/config'; //all global data will be stored here
import cookieParser from "cookie-parser"; 
import connectDB from "./config/mongodb.js"; // for database related purpose
import authRouter from "./routes/authRoutes.js"

const app = express(); //1.app has been created using express for backend
const port = process.env.PORT || 4000; // 
connectDB();


app.use(express.json()); // all the request will be passed as JSON
app.use(cookieParser());
app.use(cors({credentials:true})); //can be send cookies as response from express app

// API Endpoints
app.get("/",(req,res)=>{res.send("API is Working")})
app.use('/api/auth',authRouter) 

app.listen(port , ()=>{
    console.log(`Server is running at port : ${port}`);
})

// mongodb+srv://aspershdex:<db_password>@cluster0.jfjjduh.mongodb.net/
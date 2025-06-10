import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/usermodel.js";


export const register = async (req,res)=>{ // here will create all controller funcions like login logout verify login paswword reset , 
    const {name,email,password} = req.body;
    // if there is any missing valyue from usres name , password or email then it will return missing details 
    if(!name || !email || !password)
            {
                return res.json({success : false , message : "Missing Details"})
            }
    try{ //!if nothing goes wrrong then this try block will run

        const exisitingUser = await userModel.findOne({email})
        if (exisitingUser){ return res.json({success : flase , message : "User Already Exists"}) }

        const hashedPassword = await bcrypt.hash(password, 10)  //here 10 is level of encryption 5-15
        const user = new userModel({name ,email, password:hashedPassword})
        await user.save();

    //? now heree we will be creating the jwt for authentiation windows,  we will sned this token using cookies , token will  be generated usig jwt 
    //   whenever a  new user is created in mongoDb , the user id is createdd , therfir we can extract that propert using _id 
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET , {expiresIn:'7d'});
        res.cookie('token', token, {
            httpOnly :true,
            secure   :process.env.NODE_ENV === 'production'? true:false  ,
            sameSite :process.env.NODE_ENV === 'production' ? 'none' :'strict' , 
            maxAge : 7*24*60*60*1000  //? seven days expiry time for this cookie and written in the form of millisecond
        });
        return res.json({success:true});
    }
    // if any else happens then in that case  , error message wll be thrown
    catch(error)
        {
            res.json({success:false , message:error.message})
        }

}


export const login = async (req,res)=>{
        const {email,password} = req.body;
        if(!email || !password)
                {
                    return res.json({success:false , message: "email and password required"})
                }
        try
        {
            const user = await userModel.findOne({email});
            if (!user) {res.json({success:false , message:"invallid email"})}
            const isMatch = await bcrypt.compare(password , user.password)
            if(!isMatch) {res.json({success:false , message:"invalid password"})}
            
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET , {expiresIn:'7d'});
            res.cookie('token', token, {
                    httpOnly :true,
                    secure   :process.env.NODE_ENV === 'production'? true:false  ,
                    sameSite :process.env.NODE_ENV === 'production' ? 'none' :'strict' , 
                    maxAge : 7*24*60*60*1000  //? seven days expiry time for this cookie and written in the form of millisecond
        });

        return res.json({success:true});

        }
        catch(err)
        {
            return res.json({success:flase , message: err.message});
        }   
}

export const logout = async(req,res)=>{
        try
        {
            res.clearCookie ('token', {
                    httpOnly :true,
                    secure   :process.env.NODE_ENV === 'production'? true:false  ,
                    sameSite :process.env.NODE_ENV === 'production' ? 'none' :'strict' , 
                    maxAge : 7*24*60*60*1000  //? seven days expiry time for this cookie and written in the form of millisecond 
            })
            return res.json({success:true , message  : "Logged Out Succesfully"})
        }
        catch(err)
            {
                res.json({success:false , message: err.message})
            }
}

// till now e have created teh controller funcion for usr regestartion , user login , user logout , after this we need to create the api end points , and we will do this using routes
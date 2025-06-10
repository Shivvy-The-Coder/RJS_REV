// here we will create the usermodel , 

import mongoose from "mongoose";

// to create a user we will be needing the following things , first we will be needing the name , email and password
// below we have created the usr schema
const userSchema = new mongoose.Schema({
    name : {type :String , required : true},
    email : {type :String , required : true , unique:true},
    password : {type :String , required : true },

    // below fields will be appliped with a default values, we wont have to provide this , as this will be automatically added for any new user
    verifyOtp : {type :String , default:'' },
    verifyOtpExpireAt : {type :Number , default:0 },
    isAccountVerified : {type :Boolean , default:false },
    resetOtp : {type :String , default:'' },
    resetOtpExpireAt : {type :Number , default:0  },

});

// here we  are creating a model using mongoose.model model name is user with its schema that is userSchema, t
const userModel =mongoose.models.user || mongoose.model('user' , userSchema);
export default userModel;

// now we can use this user model to store the user data in mongo Db databse

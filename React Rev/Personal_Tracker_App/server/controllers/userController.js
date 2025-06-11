import userModel from "../models/userModel.js";

// export const  getUserData = async (req,res)=>{
//     try{
//         const {userId} = req.body;
//         const user = await userModel.findById(userId);
//         if(!user)
//             res.json({success:false , message:"User Not FOund"});
//         res.json(
//             {
//                 success:true,
//                 userData:{
//                         name :user.name,
//                         isAccountVerified : user.isAccountVerified
//                 }
//             }
//         )
//     }
//     catch(err)
//         {
//             res.json({success:false , message:err.message})
//         }
// }

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("userId in getUserData:", userId); // ✅ Debug line

    const user = await userModel.findById(userId); // ✅ FIXED: capital B

    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    return res.json({
      success: true,
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

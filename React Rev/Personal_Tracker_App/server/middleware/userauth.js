// import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";
// const userAuth = async(req,res , next)=>{
//     const {token} = req.cookies;
//     if(!token)
//             return res.json({succss:false , message:"not Authorized Login Again"})
//     try
//     {
//        const tokenDecode= jwt.verify(token,process.env.JWT_SECRET)
//        if(tokenDecode.id)
//             {
//                 req.userID=tokenDecode.id;
//             }
//         else
//             {
//                 return res.json({succss:false , message:"Not Authorized Login Again"})
//             }
//         next();
//     }
//     catch(err)
//         {
//             return res.json({succss:false , message:err.message})
//         }
    

// }

// export default userAuth;


import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.json({ success: false, message: "Not Authorized. Login again." });

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    
    if (tokenDecode.id) {
      req.userId = tokenDecode.id; // safer than modifying req.body
      next();
    } else {
      return res.json({ success: false, message: "Not Authorized. Login again." });
    }
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export default userAuth;

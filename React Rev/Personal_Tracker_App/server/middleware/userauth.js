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

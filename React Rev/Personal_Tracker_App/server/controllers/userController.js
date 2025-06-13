import userModel from "../models/userModel.js";
import skillModel from "../models/skillModel.js";
import personalInfoModel from "../models/personalInfoModel.js";


export const getUserData = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("userId in getUserData:", userId); 

    const user = await userModel.findById(userId); 

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

// Gtting full dashboard informtion
export const getDashboardData = async (req, res) => {
  try {
    const userId = req.userId;

    const [user, personalInfo, skills] = await Promise.all([
      userModel.findById(userId).select("name email"),
      personalInfoModel.findOne({ userId }),
      skillModel.find({ userId }),
    ]);

    if (!user) return res.json({ success: false, message: "User not found" });

    return res.json({
      success: true,
      data: {
        user,
        personalInfo,
        skills,
      },
    });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

// Update personal info
export const updatePersonalInfo = async (req, res) => {
  const { bio, goals } = req.body;
  try {
    const userId = req.userId;
    const updated = await personalInfoModel.findOneAndUpdate(
      { userId },
      { bio, goals },
      { upsert: true, new: true }
    );
    return res.json({ success: true, data: updated });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

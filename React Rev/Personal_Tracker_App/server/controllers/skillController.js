import skillModel from "../models/skillModel.js";

export const addSkill = async (req, res) => {
  const { name, proficiency, hoursSpent } = req.body;
  try {
    const skill = await skillModel.create({
      userId: req.userId,
      name,
      proficiency,
      hoursSpent,
    });
    return res.json({ success: true, data: skill });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export const updateSkill = async (req, res) => {
  const { skillId, name, proficiency, hoursSpent } = req.body;
  try {
    const updatedSkill = await skillModel.findOneAndUpdate(
      { _id: skillId, userId: req.userId },
      { name, proficiency, hoursSpent },
      { new: true }
    );
    return res.json({ success: true, data: updatedSkill });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export const deleteSkill = async (req, res) => {
  const { skillId } = req.body;
  try {
    await skillModel.findOneAndDelete({ _id: skillId, userId: req.userId });
    return res.json({ success: true, message: "Skill deleted" });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

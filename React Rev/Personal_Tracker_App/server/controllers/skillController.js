import skillModel from "../models/skillModel.js";

export const addSkill = async (req, res) => {
  console.log("Adding  Skill", req.body);  
  const { name, proficiency, hoursSpent } = req.body;
  try {
    const skill = await skillModel.create({
      userId: req.userId,
      name,
      proficiency,
      hoursSpent: Number(hoursSpent) || 0,
    });
    return res.json({ success: true, data: skill });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};
// below is he code for updating skills

export const updateSkill = async (req, res) => {
  console.log("Updating Skill:", req.body);  
  const { skillId, name, proficiency, hoursSpent } = req.body;

  const updateFields = {};
  if (name !== undefined) updateFields.name = name;
  if (proficiency !== undefined) updateFields.proficiency = proficiency;
  if (hoursSpent !== undefined) updateFields.hoursSpent = Number(hoursSpent) || 0;

  try {
    const updatedSkill = await skillModel.findOneAndUpdate(
      { _id: skillId, userId: req.userId },
      updateFields,
      { new: true }
    );
    return res.json({ success: true, data: updatedSkill });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};


export const deleteSkill = async (req, res) => {
  const skillId  = req.params.id;
  try {
    await skillModel.findOneAndDelete({ _id: skillId, userId: req.userId });
    return res.json({ success: true, message: "Skill deleted" });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

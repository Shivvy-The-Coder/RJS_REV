import mongoose from "mongoose";

const personalInfoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
  bio: { type: String, default: '' },
  goals: { type: String, default: '' },
});

const personalInfoModel = mongoose.model("personalInfo", personalInfoSchema);

export default personalInfoModel;

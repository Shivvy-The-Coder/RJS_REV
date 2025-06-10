import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`);

    console.log("✅ Database connected"); // moved here
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
export default connectDB;
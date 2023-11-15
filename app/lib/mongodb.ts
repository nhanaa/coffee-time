import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB connected");
    } else {
      throw new Error("MONGODB_URI is not defined");
    }
  } catch (error) {
    console.log(error);
  }
}

export default connectMongoDB;

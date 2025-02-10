import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("DB Connection established");
  } catch (error) {
    console.log("DB ERROR: " + error);
  }
};

export default dbConnection;

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const createConnection = async function () {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    console.log("Database connected successfully");
  } catch (error) {
    throw new Error(`Database connection failed: ${error.message}`);
  }
};

export { createConnection };

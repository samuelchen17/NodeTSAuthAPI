import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // load env variables

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("DB URL is not configured");
    }
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB is connected");
  } catch (error) {
    console.error("Error connecting to DB", error);
    process.exit(1);
  }
};

export default connectDB;

// mongoose.Promise = Promise;
// mongoose.connect(process.env.MONGODB_URL);
// mongoose.connection.on("error", (error: Error) => console.log(error));

import mongoose from "mongoose";

export const connect = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL);

    if (db) {
      console.log("Database is connected");
    } else {
      console.log("Cannot connect");
    }
  } catch (error) {
    console.log(error);
  }
};

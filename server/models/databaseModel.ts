import MongoDBStore from "connect-mongodb-session";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";

dotenv.config();
const mongoURI: string = process.env.MONGO_URI ?? "";
// connect to database
export default async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo DB");
  } catch (err) {
    console.log(err);
  }
}

const MongoDBStoreSession = MongoDBStore(session);
export const store = new MongoDBStoreSession({
  uri: mongoURI,
  collection: "passportSession",
});
store.on("error", (error) => {
  console.error("Session store error:", error);
});

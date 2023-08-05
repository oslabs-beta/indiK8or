import mongoose from "mongoose";

const Schema = mongoose.Schema;
const mongoURI: string = process.env.MONGO_URI ?? "";
// connect to database
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to Mongo DB"))
  .catch((err: string) => console.log(err));

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 300, default: Date.now() },
});
//ensure that the "sessions" collection only retains documents for a specified period of time
sessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60000 });

export const Session = mongoose.model("Session", sessionSchema);

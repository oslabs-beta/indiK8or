import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 300, default: Date.now() },
});
//ensure that the "sessions" collection only retains documents for a specified period of time
sessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export const Session = mongoose.model("Session", sessionSchema);

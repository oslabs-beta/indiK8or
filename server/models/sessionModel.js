import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now() },
});

sessionSchema.index({ "createdAt": 1 }, { expireAfterSeconds: 60000 });

export const Session = mongoose.model("Session", sessionSchema);
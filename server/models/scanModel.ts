import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const scannedResultSchema = new Schema({
  imageName: { type: String, required: true, unique: true },
  scannedResult: { type: Object, required: true },
});

export const ScannedResult = mongoose.model('ScannedResult', scannedResultSchema);
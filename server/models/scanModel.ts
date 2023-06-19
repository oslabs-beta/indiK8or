import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const scanSchema = new Schema({
  imageName: { type: String, required: true },
  scannedResult: { type: String, required: true },
});

export const Session = mongoose.model('Scanned', scanSchema);

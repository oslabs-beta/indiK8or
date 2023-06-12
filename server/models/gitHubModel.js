import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const gitSchema = new Schema({
  username: { type: String, required: true, unique: true },
});

const GitUser = mongoose.model('gituser', gitSchema);

export { GitUser };
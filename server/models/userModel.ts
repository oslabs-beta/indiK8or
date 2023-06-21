import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
//specify a level of work factor for the bcrypt hashing algorithm.
const SALT_WORK_FACTOR = 10;

// pre hook runs a function before the document is saved to the collection
userSchema.pre('save', function (next) {
  // hash the user password using bcrypt and store the hashed result in database
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    return next();
  });
});

const User = mongoose.model('user', userSchema);

export { User };

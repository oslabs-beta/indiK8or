import {Document, Model, Schema, model} from 'mongoose';

interface IGitUser extends Document {
  username: string;
  createdAt: string;
}

type GitUserModel = Model<IGitUser>;

const gitSchema = new Schema<IGitUser>({
  username: { type: String, required: true, unique: true },
  createdAt: {
    type: String,
    default: () => {
      const date = new Date();
      return `${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    },
  },
});

const GitUser: GitUserModel = model<IGitUser>('gituser', gitSchema);

export { GitUser, IGitUser };
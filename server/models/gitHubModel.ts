// import mongoose from 'mongoose';

// /*
// This file is unused since converting backend to TS, but it is a great example of what a model looks like before it needs to be modified to work with passport js
// */

// const Schema = mongoose.Schema;

// const gitSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   createdAt: {
//     type: String,
//     default: () => {
//       const date = new Date();
//       return `${
//         date.getMonth() + 1
//       }/${date.getDate()}/${date.getFullYear()} ${date
//         .getHours()
//         .toString()
//         .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
//     },
//   },
// });

// const GitUser = mongoose.model('gituser', gitSchema);

// export { GitUser };

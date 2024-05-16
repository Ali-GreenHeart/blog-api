import { Schema, model } from "mongoose";

const userModel = model(
  "users",
  new Schema(
    {
      username: String,
      name: String,
      surname: String,
      job: String,
      email: String,
      password: String,
      isAdmin: {
        type: Boolean,
        default: false
      }
    },
    { versionKey: false }
  )
);

export default userModel;

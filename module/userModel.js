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
    },
    { versionKey: false }
  )
);

export default userModel;

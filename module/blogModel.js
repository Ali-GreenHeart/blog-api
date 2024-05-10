import { Schema, model } from "mongoose";

const blogModel = model(
  "blogs",
  new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: String,
      userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      categoryId: {
        type: Schema.Types.ObjectId,
        ref: "categories",
      },
    },
    {
      timestamps: true,
    }
  )
);

export default blogModel;

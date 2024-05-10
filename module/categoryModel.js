import { Schema, model } from "mongoose";

const categoryModel = model(
  "categories",
  new Schema(
    {
      name: String,
    },
    { versionKey: false }
  )
);

export default categoryModel;

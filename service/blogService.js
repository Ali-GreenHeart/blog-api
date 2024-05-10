import model from "../module/blogModel.js";
// import bcrypt, { compareSync } from "bcrypt";

export const getAllBlog = async () => {
  const item = await model
    .find()
    .populate({ path: "userId", select: "-password" })
    .populate("categoryId")
    .exec();
  return item;
};
export const createBlog = async (data) => {
  const item = await model.create(data);
  return item;
};
export const deleteBlog = async (id) => {
  const item = await model.findByIdAndDelete(id);
  return item;
};

export const updateBlog = async (id, data) => {
  const item = await model.findByIdAndUpdate(id, data);
  return item;
};

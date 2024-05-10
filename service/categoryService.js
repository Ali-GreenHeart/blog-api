import model from "../module/categoryModel.js";
// import bcrypt, { compareSync } from "bcrypt";

export const getAllCategory = async (req, res) => {
  const item = await model.find();
  return item;
};
export const createCategory = async (data) => {
  const item = await model.create(data);
  return item;
};
export const deleteCategory = async (id) => {
  const item = await model.findByIdAndDelete(id);
  return item;
};

export const updateCategory = async (data, id) => {
  const item = await model.findByIdAndUpdate(data, id);
  return item;
};

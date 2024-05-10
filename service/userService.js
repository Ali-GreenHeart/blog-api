import model from "../module/userModel.js";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
export const getAllUsers = async (req, res) => {
  const item = await model.find();
  return item;
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await model.findOne({ email });
  if (user) {
    const userCheck = await bcrypt.compareSync(password, user.password);
    if (userCheck) {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
      res.send({ accessToken: token });
    } else {
      res.status(401).send("wrong password");
    }
  } else res.status(404).send("wrong email");
};

export const createUsers = async (req, res) => {
  const { password, email, ...rest } = req.body;
  const hashPass = await bcrypt.hash(password, 10);
  const user = await model.findOne({ email });
  if (!user) {
    const item = await model.create({
      password: hashPass,
      email,
      ...rest,
    });
    res.status(201).send(item);
  } else {
    res.status(409).send("this email already exists");
  }
};

export const deleteUser = async (id) => {
  const item = await model.findByIdAndDelete(id);
  return item;
};

export const updateUser = async (data, id) => {
  const item = await model.findByIdAndUpdate(data, id);
  return item;
};

export const profile = async (req, res) => {
  const item = await model.findById(req.user._id).select("-password");
  res.send(item);
};

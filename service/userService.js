import model from "../module/userModel.js";
import blogModel from "../module/blogModel.js";
import bcrypt from "bcrypt";
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
export const superAdminLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await model.findOne({ email });
  if (user) {
    const userCheck = await bcrypt.compareSync(password, user.password);
    if (userCheck) {
      const token = jwt.sign({ _id: user._id, role: "SUPER-ADMIN" }, process.env.SECRET_KEY);
      res.send({ accessToken: token });
    } else {
      res.status(401).send("wrong password");
    }
  } else res.status(404).send("wrong email");
};
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await model.findOne({ email });
  if (!user.isAdmin) {
    res.status(401).send("you're not admin!");
    return;
  }
  if (user) {
    const userCheck = await bcrypt.compareSync(password, user.password);
    if (userCheck) {
      const token = jwt.sign({ _id: user._id, role: "ADMIN" }, process.env.SECRET_KEY, { expiresIn: '1m' });
      const refreshToken = jwt.sign({ _id: user._id, role: "ADMIN" }, process.env.SECRET_KEY, { expiresIn: '1d' });

      res
        .cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: 'strict' })
        .header('Authorization', token)
        .send({ accessToken: token });

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
    item.password = undefined
    res.status(201).send(item);
  } else {
    res.status(409).send("this email already exists");
  }
};
export const addAdmin = async (req, res) => {
  const { password, email, ...rest } = req.body;
  const hashPass = await bcrypt.hash(password, 10);
  const user = await model.findOne({ email });
  if (!user) {
    const item = await model.create({
      password: hashPass,
      email,
      isAdmin: true,
      ...rest,
    });
    item.password = undefined
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
  const item = (await model.findById(req.user._id).select("-password"));
  const blogs = await blogModel.find({ userId: item._id })
    .populate("categoryId")
  const data = { ...item._doc, blogs }
  res.send(data);
};

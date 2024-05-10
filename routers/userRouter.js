import { Router } from "express";
import {
  createUsers,
  deleteUser,
  getAllUsers,
  loginUser,
  profile,
  updateUser,
} from "../service/userService.js";
import userMiddleWare from "../middlewares/userAuth.js";
const userRouter = new Router();

userRouter.get("/", async (req, res) => {
  const item = await getAllUsers();
  res.status(200).send(item);
});
userRouter.post("/", createUsers);
userRouter.post("/login", loginUser);
userRouter.get("/profile", userMiddleWare, profile);
userRouter.delete("/:id", async (req, res) => {
  const item = await deleteUser(req.params.id);
  res.status(201).send(item);
});

userRouter.put("/:id", async (req, res) => {
  const item = await updateUser(req.params.id, req.body);
  res.status(201).send({
    message: "user updated successfully",
    data: item,
  });
});
export default userRouter;

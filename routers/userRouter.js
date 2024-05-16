import { Router } from "express";
import {
  addAdmin,
  adminLogin,
  createUsers,
  deleteUser,
  getAllUsers,
  loginUser,
  profile,
  superAdminLogin,
  updateUser,
} from "../service/userService.js";
import userMiddleWare from "../middlewares/userAuth.js";
import superAdminMiddleWare from "../middlewares/superAdminMiddleWare.js";
const userRouter = new Router();

userRouter.get("/", async (req, res) => {
  const item = await getAllUsers();
  res.status(200).send(item);
});
userRouter.post("/register", createUsers);
userRouter.post("/login", loginUser);
userRouter.get("/profile", userMiddleWare, profile);

userRouter.post("/add-admin", superAdminMiddleWare, addAdmin);
userRouter.post('/superAdmin-login', superAdminLogin)
userRouter.post('/admin-login', adminLogin)

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

import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../service/categoryService.js";
import adminMiddleWare from "../middlewares/adminMiddleWare.js";
const categoryRouter = new Router();

categoryRouter.get("/", async (req, res) => {
  const item = await getAllCategory();
  res.status(200).send(item);
});
categoryRouter.post("/", adminMiddleWare, async (req, res) => {
  const item = await createCategory(req.body);
  res.status(201).send(item);
});
categoryRouter.delete("/:id", async (req, res) => {
  const item = await deleteCategory(req.params.id);
  res.status(201).send(item);
});

categoryRouter.put("/:id", async (req, res) => {
  const item = await updateCategory(req.params.id, req.body);
  res.status(201).send({
    message: "user updated successfully",
    data: item,
  });
});
export default categoryRouter;

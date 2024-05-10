import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  updateBlog,
} from "../service/blogService.js";
const blogRouter = new Router();

blogRouter.get("/", async (req, res) => {
  const item = await getAllBlog();
  res.status(200).send(item);
});
blogRouter.post("/", async (req, res) => {
  const item = await createBlog(req.body);
  res.status(201).send(item);
});
blogRouter.delete("/:id", async (req, res) => {
  const item = await deleteBlog(req.params.id);
  res.status(201).send(item);
});

blogRouter.put("/:id", async (req, res) => {
  const item = await updateBlog(req.params.id, req.body);
  res.status(201).send({
    message: "blog updated successfully",
    data: item,
  });
});
export default blogRouter;

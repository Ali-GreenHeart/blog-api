import express from "express";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import dbConnect from "./utils/db.js";
import blogRouter from "./routers/blogRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
dotenv.config();
dbConnect();
const app = express();
app.use(express.json());
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/category", categoryRouter);
app.listen(process.env.BLOG_PORT, () => {
  console.log("listening on " + process.env.BLOG_PORT);
});

import { Router } from "express";
import userRouter from "./userRouter.js";
import blogRouter from "./blogRouter.js";
import categoryRouter from "./categoryRouter.js";

const router = new Router()

router.use("/user", userRouter);
router.use("/blog", blogRouter);
router.use("/category", categoryRouter);


export default router;

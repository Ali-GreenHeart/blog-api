import dotenv from "dotenv";
import express from "express";
import swaggerUI from "swagger-ui-express";
import router from "./routers/index.js";
import swaggerJson from "./swagger-output.json" assert { type: "json" };
import dbConnect from "./utils/db.js";

dotenv.config();
dbConnect();
const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use(express.json());
app.use('/', router)
app.listen(process.env.BLOG_API_PORT, () => {
  console.log("listening on " + process.env.BLOG_API_PORT);
});

import { connect } from "mongoose";

export default async function dbConnect() {
  await connect(process.env.BLOG_API);
  console.log("db is connected...");
}

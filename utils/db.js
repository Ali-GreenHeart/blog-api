import { connect } from "mongoose";

export default async function dbConnect() {
  await connect(process.env.DB_CON_STRING);
  console.log("db is connected...");
}

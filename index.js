import app from "./app.js";
import connectDb from "./server.js";
import dotenv from "dotenv";
dotenv.config();

connectDb();
app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});

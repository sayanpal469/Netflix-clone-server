import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);


// Apis
app.use('/api/user', userRouter)

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Ecommerse server");
});

export default app;

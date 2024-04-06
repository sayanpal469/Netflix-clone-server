import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Ecommerse server");
});

export default app;

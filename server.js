import express from "express";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();

const app = express();
// app.use(express.json()); // body parsing

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is Running!");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.yellow.bold);
});

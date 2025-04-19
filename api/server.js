require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const schoolRouter = require("./routers/school.router");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOption = { exposedHeaders: "Authorization" };
app.use(cors(corsOption));
app.use(cookieParser());

//MONGODB CONNECTION

mongoose
  .connect("mongodb://localhost:27017/schoolManagement2024")
  .then((db) => {
    console.log("MongoDb is connected Successfully.");
  })
  .catch((e) => {
    console.log("MongoDb error", e);
  });
app.use("/api/school", schoolRouter);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

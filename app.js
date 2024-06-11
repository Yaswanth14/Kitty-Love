const express = require("express");
const app = express();
const userRouter = require("./Router/userRouter");
const statusRouter = require("./Router/statusRouter");
const cors = require("cors");

// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/user", userRouter);
app.use("/status", statusRouter);

module.exports = app;

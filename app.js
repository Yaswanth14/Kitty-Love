const express = require("express");
const app = express();
const userRouter = require("./Router/userRouter");
const statusRouter = require("./Router/statusRouter");
const cors = require("cors");

// app.use(cors());
app.use(
  cors({
    origin: ["https://mykittylove.vercel.app"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/user", userRouter);
app.use("/status", statusRouter);

module.exports = app;

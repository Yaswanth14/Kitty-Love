const express = require("express");
const app = express();
const userRouter = require("./Router/userRouter");
const statusRouter = require("./Router/statusRouter");
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "https://mykittylove.vercel.app",
  "https://kittylove-git-main-ashishnallanas-projects.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

app.use(cors());
// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
//     credentials: true,
//   })
// );
app.use(express.json());

app.use("/user", userRouter);
app.use("/status", statusRouter);

module.exports = app;

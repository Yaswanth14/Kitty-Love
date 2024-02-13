const express = require('express');
const app = express();
const userRouter = require('./Router/userRouter');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);


module.exports = app
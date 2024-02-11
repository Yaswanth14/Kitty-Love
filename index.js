require('dotenv/config');
const mongoose = require('mongoose');
const app = require('./app')

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("MongoDB Connection Failed"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
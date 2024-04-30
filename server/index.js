const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://burhansq4906:burhan098@cluster0.1lsshex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error in connecting database"));
db.once("open", () => console.log("Connected to database"));
app.use(express.json());
app.use(cors());
app.use("/api/users", require("./routes/user"));
app.use("/api/exams", require("./routes/exam"));
app.use("/api/reports", require("./routes/reports"));
const port = process.env.PORT;
app.listen(3001, () => {
  console.log("Server listening on port 3001");
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const authroutes = require("./routes/auth");
const client = require("./config/db");


app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.status(200).send("Hiiiii");
});

client.connect(()=>{
  console.log("Connected to Database");
});

app.use("/auth", authroutes);

app.listen(port, () => {
  console.log("Server is running");
});

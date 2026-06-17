const express = require("express");
const cors = require("cors");

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    message: "EA FC Career Tracker API"
  });
});

app.use("/api", routes);

module.exports = app;
const express = require("express");
const cors = require("cors");
const env = require("./config/env");
const routes = require("./routes");

const app = express();

app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({ message: "EA FC Career Tracker API" });
});

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada." });
});

module.exports = app;

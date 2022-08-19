const express = require("express");
require("dotenv").config();
const path = require("path");
const PORT = process.env.PORT || 8080;

// initialize express
const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

// routes
app.use("/tasks", require("./routes/tasksRoute"));

// running express
app.listen(PORT, console.log(`Server Runnning on ${PORT}`));

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Task = require("../models/Task");

// get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
  }
});

// set a taks
router.post("/", async (req, res) => {
  if (
    !req.body.text ||
    !req.body.day ||
    typeof req.body.reminder === "undefined"
  ) {
    return res.status(400).json({ msg: "missing credentials" });
  }

  const newTask = new Task({
    text: req.body.text,
    day: req.body.day,
    reminder: req.body.reminder,
  });
  try {
    const task = await newTask.save();
    res.status(200).json({ task });
  } catch (error) {
    console.log(error);
  }
});

// update a task
router.put("/:id", (req, res) => {
  console.log(req.params.id);
  res.json({ msg: "ok" });
});

module.exports = router;

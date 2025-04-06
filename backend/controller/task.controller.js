const Task = require("../models/task.model");

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, msg: "Please provide status and description" });
    }
    const task = await new Task({ title, description, status });
    await task.save();
    return res
      .status(201)
      .json({ success: true, msg: "Task created successfully", task });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (tasks.length === 0) {
      return res.status(404).json({ success: true, msg: "No task found" });
    }
    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params._id);
    if (!task) {
      return res.status(404).json({ success: false, msg: "Task not found" });
    }
    return res.status(200).json({ success: true, task });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const _id = req.params._id;

    // for complete update
    // console.log(req.body, _id);
    // if (!title || !description) {
    //   return res
    //     .status(400)
    //     .json({ success: false, msg: "Please provide status and description" });
    // }
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: _id },
      { $set: req.body },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ success: true, msg: "Task updated successfully", updatedTask });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params._id, {
      new: true,
    });
    if (!deleteTaskById) {
      return res.status(404).json({
        success: false,
        msg: "Task not found or not successfully deleted",
      });
    }
    return res
      .status(200)
      .json({ success: true, msg: "Task deleted successfully", deleteTask });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTaskById,
  deleteTaskById,
  getTaskById,
};

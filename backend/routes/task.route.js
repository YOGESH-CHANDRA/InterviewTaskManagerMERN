const express = require("express");

const {
  createTask,
  getAllTasks,
  updateTaskById,
  deleteTaskById,
  getTaskById,
} = require("../controller/task.controller");

const taskRouter = express.Router();

taskRouter.route("/").get(getAllTasks).post(createTask);

taskRouter
  .route("/:_id")
  .get(getTaskById)
  .post(createTask)
  .put(updateTaskById)
  .delete(deleteTaskById);

module.exports = taskRouter;

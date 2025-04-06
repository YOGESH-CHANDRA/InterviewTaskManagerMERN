require("dotenv").config();
const express = require("express");
const databaseconnection = require("./db/connection");
const taskRouter = require("./routes/task.route");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const globalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 30, // Limit each IP to 30 requests per window
  message: `Too many requests try after some time`,
  headers: true, // Include rate limit headers in response
});

app.use(globalLimiter);

app.use("/api/v1/tasks", taskRouter);

// let count = 0;
app.get("/", (req, res) => {
  try {
    res.send(`Task Manager API is running`);
  } catch (error) {
    console.log(error);
    res.send(`Task Manager API error: ${error.message}`);
  }
});

databaseconnection(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`App is running on port no. ${process.env.PORT}`)
    );
  })
  .catch(() => {
    console.log("Database connection failed");
  });

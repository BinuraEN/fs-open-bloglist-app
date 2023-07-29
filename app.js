const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const notesRouter = require("./controllers/blogs");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("./utils/middleware");

const config = require("./utils/config");
const logger = require("./utils/logger");

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to mongodb");
  })
  .catch((err) => {
    logger.error("error occured when connecting to mongodb", err.message);
  });

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use("/api/blogs", notesRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

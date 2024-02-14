const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotevn = require("dotenv");
const coursesRoutes = require("./routes/courses-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const rateLimiter = require("./middleware/rateLimiter");

dotevn.config();

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // tells which domain should have access and * means any domain
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // incoming requests with these headers will be allowed
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use(rateLimiter);

app.use("/api/courses", coursesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// adding error handling middleware, mainly for handling unknown request/paths
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred." });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(
      process.env.SERVER_PORT,
      console.log(`server running on port ${process.env.SERVER_PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });

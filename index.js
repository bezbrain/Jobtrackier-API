const express = require("express");
require("dotenv").config();
require("express-async-errors");
const NotFoundMiddleware = require("./middleware/not-found");
const ErrorHandlerMiddleware = require("./middleware/error-handler");

// The dynamic port
const port = process.env.PORT || 3000;

const app = express();

app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

// Start db
const startDB = async () => {
  app.listen(port, console.log(`Server is listening on port ${port}`));
};

startDB();

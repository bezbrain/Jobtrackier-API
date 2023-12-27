const express = require("express");
require("dotenv").config();
require("express-async-errors");
const authRouter = require("./routes/auth.route");
const NotFoundMiddleware = require("./middleware/not-found");
const ErrorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const app = express();

app.use(express.json());

// The dynamic port
const port = process.env.PORT || 3000;

// Routes
app.get("/", (req, res) => {
  res.send("This is the home page");
});

app.use("/api/v1/auth", authRouter);

app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

// Start db
const startDB = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startDB();

const express = require("express");
require("dotenv").config();
require("express-async-errors");

// Extra security
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// Swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocs = YAML.load("./swagger.yaml");

const authMiddleware = require("./middleware/auth");
const authRouter = require("./routes/auth.route");
const jobRouter = require("./routes/job.route");
const NotFoundMiddleware = require("./middleware/not-found");
const ErrorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const app = express();

app.use(express.json());

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Use an external store for consistency across multiple server instances.
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

// The dynamic port
const port = process.env.PORT || 3000;

// Routes
app.get("/", (req, res) => {
  res.send("<h2>Home page</h2><a href='/jobtrackier-api'>Go To Docs</a>");
});

// Serve docs
app.use("/jobtrackier-api", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobRouter);

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

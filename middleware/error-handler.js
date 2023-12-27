const { StatusCodes } = require("http-status-codes");

const ErrorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    message: err.message || "Something went wrong. Please try again later",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  res.statusCode(customError.statusCode).json({
    success: false,
    message: customError.message,
  });
};

module.exports = ErrorHandlerMiddleware;

const { StatusCodes } = require("http-status-codes");

const ErrorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    message: err.message || "Something went wrong. Please try again later",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  //   Handle validation error
  if (err.name === "ValidationError") {
    const errorValue = Object.values(err.errors)
      .map((each) => each.message)
      .join(", ");
    // console.log(errorValue);
    customError.message = errorValue;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  //   Duplicated error
  if (err.code === 11000) {
    const errorValue = Object.keys(err.keyValue)[0];
    // console.log(errorValue);
    customError.message = `${errorValue} already existed. Please use another ${errorValue}`;
    customError.statusCode = StatusCodes.UNAUTHORIZED;
  }

  res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
  });
  //   res.status(customError.statusCode).json({
  //     success: false,
  //     message: err,
  //   });
};

module.exports = ErrorHandlerMiddleware;

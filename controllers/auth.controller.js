const UserCollection = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const UnauthenticatedError = require("../errors/unauthenticated");

const signup = async (req, res) => {
  const user = await UserCollection.create(req.body);
  // Fetch token
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "User created successfully",
    token,
  });
};

const signin = async (req, res) => {
  const {
    body: { email, password },
  } = req;

  //   Check if email and password values are provided
  if (!email || !password) {
    throw new BadRequestError("Email and password must be provided");
  }

  //   Find one email value provided by the user in the dbb
  const user = await UserCollection.findOne({ email });

  if (!user) {
    throw new BadRequestError("Email does not exist");
  }

  //   Fetch password comparison
  const isPasswordCorrect = await user.comparePassword(password);
  // Check if password is correct
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Password does not match");
  }

  //   Fetch token
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Login successful",
    token,
  });
};

module.exports = {
  signup,
  signin,
};

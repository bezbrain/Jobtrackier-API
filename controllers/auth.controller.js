const UserCollection = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const signup = async (req, res) => {
  const user = await UserCollection.create(req.body);

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "User created successfully",
    token,
  });
};

const signin = async (req, res) => {
  res.send("Please Login");
};

module.exports = {
  signup,
  signin,
};

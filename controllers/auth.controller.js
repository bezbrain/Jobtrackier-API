const UserCollection = require("../models/User");

const signup = async (req, res) => {
  const user = await UserCollection.create(req.body);
  res.send("Please Register");
};

const signin = async (req, res) => {
  res.send("Please Login");
};

module.exports = {
  signup,
  signin,
};

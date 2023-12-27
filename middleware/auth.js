const UnauthenticatedError = require("../errors/unauthenticated");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const {
    headers: { authorization },
  } = req;

  //   Check if token is available and if in the right format
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthenticatedError("User unauthorized");
  }

  const getToken = authorization.split(" ")[1];

  try {
    const payload = jwt.verify(getToken, process.env.JWT_SECRET);
    const { userId, username } = payload;
    req.user = { userId, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid token hence not authenticated");
  }
};

module.exports = authMiddleware;

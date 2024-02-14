const HttpError = require("../models/http-error");
const { User } = require("../models/user-schema");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later",
      500
    );
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError("Invalid Credentials, please try again", 403);
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
  });
};

exports.login = login;

const userModel = require("../models/user.model");
const userServices = require("../services/user.services");
const { validationResult } = require("express-validator");
const blacklistTokens = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;
    const isUserAlready = await userModel.findOne({ email });
    if (isUserAlready) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashPassword = await userModel.hashPassword(password);
    const user = await userServices.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashPassword,
    });
    const token = user.generateAuthToken();
    res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = user.generateAuthToken();
    res.cookie("token", token);
    res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json({
    user: req.user,
  });
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  await blacklistTokens.create({ token });

  res.status(200).json({
    message: "Logout successful",
  });
};

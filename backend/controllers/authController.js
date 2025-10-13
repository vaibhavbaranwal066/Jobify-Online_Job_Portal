// src/controllers/authController.js
import userModel from "../models/userModel.js";

// ================= REGISTER CONTROLLER =================
export const registerController = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return next("Please provide all fields");
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next("Email already registered, please login");
    }

    const user = await userModel.create({
      name,
      email,
      password,
      role: role || "Candidate", // default role if not specified
    });

    const token = user.createJWT();

    res.status(201).send({
      success: true,
      message: "User created successfully",
      user: {
        name: user.name,
        email: user.email,
        location: user.location,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// ================= LOGIN CONTROLLER =================
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return next("Please provide all fields");

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) return next("Invalid username or password");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return next("Invalid username or password");

    user.password = undefined;
    const token = user.createJWT();

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        location: user.location,
        role: user.role || "Candidate",
      },
      role: user.role || "Candidate",
      token,
    });
  } catch (error) {
    next(error);
  }
};

// src/models/userModel.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password length should be greater than 6 characters"],
      select: false, // Prevents password from being returned by default
    },
    location: {
      type: String,
      default: "India",
    },
    role: {
      type: String,
      enum: ["Candidate", "Recruiter", "Admin"],
      default: "Candidate",
    },
  },
  { timestamps: true }
);

// ================= PASSWORD HASHING =================
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ================= PASSWORD COMPARISON =================
userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

// ================= JWT CREATION =================
userSchema.methods.createJWT = function () {
  return JWT.sign(
    {
      userId: this._id,
      role: this.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

export default mongoose.model("User", userSchema);

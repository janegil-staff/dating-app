import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import { sendVerificationEmail } from "../utils/sendVertificationEmail.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered");
      return res.status(400).json({ message: "Email already registered" });
    }

    //create a new User
    const newUser = new User({
      name,
      email,
      password,
    });

    //generate the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the user to the database
    await newUser.save();

    //send the verification email to the registered user
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res
      .status(200)
      .json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //check if the user exists already
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //check in password is correct
    let passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalide password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "login failed" });
  }
};

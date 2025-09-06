import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import ApiKey from "../models/apikey.model.js";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Please Enter all details!" });
    }
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) {
      return res.status(400).json({ message: "User Already Exists!" });
    }
    const newUser = await User.create({ firstName, lastName, email, password });
    if (!newUser) {
      return res.status(400).json({ message: "Error Creating User!" });
    }
    res
      .status(201)
      .json({ message: "User created successfully!", data: newUser });
  } catch (error) {
    console.log("Error in register user controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please Enter all details!" });
    }
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ message: "User does not exist!" });
    }
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "The Entered EmailId or Password doesn't exist",
      });
    }
    const token = jwt.sign({ id: userData._id }, config.jwt_secret, {
      expiresIn: config.jwt_expiry,
    });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    };
    res.cookie("token", token, cookieOptions);
    res.status(201).json({
      message: "User logged in succesfully",
      success: true,
      user: {
        id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
    });
  } catch (error) {
    console.log("Error in login user controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMeController = async (req, res) => {
  try {
    const { _id } = req.user;

    const userData = await User.findById({ _id }).select("-password");
    if (!userData) {
      return res.status(400).json({ message: "User data doesn't exist" });
    }
    return res
      .status(201)
      .json({ message: "User data fetched successfully", data: userData });
  } catch (error) {
    console.log("Error in get me controller", error);
  }
};

export const generateApiKey = async (req, res) => {
  try {
    const { name } = req.body;
    const { _id } = req.user;
    if (!name) {
      return res.status(400).json({ message: "Api key name required!" });
    }
    const apikey = await ApiKey.create({
      user: _id,
      name,
    });
    if (!apikey) {
      return res.status(400).json({ message: "Error generating Apikey!" });
    }
    res.status(201).json({
      message: "Api key generated successfully!",
      data: {
        key: apikey.key,
        expiresAt: apikey.expiresAt,
      },
    });
  } catch (error) {
    console.log("Error in generate api key controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

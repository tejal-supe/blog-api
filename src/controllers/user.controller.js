import User from "../models/user.model.js";

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
    const userData = await User.findOne({email});
    if(!userData){
         return res.status(400).json({ message: "User does not exist!" });
    }

  } catch (error) {
    console.log("Error in login user controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

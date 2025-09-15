import Category from "../models/category.model.js";

export const createCategory = async (req, res) => {
  try {
    const {title}  = req.body;
    if(!title){
        return res.status(400).json({message:"Please enter the title"});
    }
    const category = await Category.create({
        title,slug
    })
  } catch (error) {
    console.log("Error in create category controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllCategory = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in get all category controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

import Category from "../models/category.model.js";
import Post from "../models/post.model.js";

export const createBlogPost = async (req, res) => {
  try {
    const { title, content, categoryId } = req.body;
    const { _id } = req.user;
    if (!title || !content) {
      return res.status(400).json({ message: "Enter all the details" });
    }
    if (categoryId) {
      const cat = await Category.findById(categoryId);
      if (!cat) return res.status(400).json({ message: "invalid categoryId" });
    }
    const exisitingSlug = await Post.findOne({ slug });
    if (exisitingSlug) {
      return res.status(400).json({ message: "Slug Already Exists!" });
    }
    const post = await Post.create({
      title,
      content,
      category: categoryId,
      author: _id,
    });
    if (!post) {
      return res.status(400).json({ message: "Error Creating Post!" });
    }
    res.status(201).json({ message: "Post created successfully!", data: post });
  } catch (error) {
    console.log("Error in create blog post controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllBlogPost = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = Post.countDocuments({ status: "approved" });
    const posts = await Post.find({ status: "approved" })
      .populate("author", "firstName lastName")
      .populate("categories", "title slug")
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(201).json({
      message: "Posts fetched successfully",
      data: posts,
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log("Error in get all blog post controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id })
      .populate("author", "firstName lastName")
      .populate("categories", "title slug");

    if (!post) {
      return res.status(400).json({ message: "Blog Post doesnot exist!" });
    }

    res.status(201).json({ message: "Blog Fetched Successfully!", data: post });
  } catch (error) {
    console.log("Error in get blog post by id controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const { categoryId } = req.body;

    const post = await Post.findOne({ _id: id });
    if (!id) {
      return res.status(400).json({ message: "Blog Post doesnt exist" });
    }
    if (post.author._id !== _id) {
      return res
        .status(400)
        .json({ message: "Forbidden, Only author can edit the blog" });
    }
    if (post.status === "approved") {
      return res
        .status(400)
        .json({ message: "Published Blogs cannot be edited!" });
    }
    if (categoryId) {
      const cat = await Category.findById(categoryId);
      if (!cat) return res.status(400).json({ message: "invalid categoryId" });
    }
    const editPost = await Post.findByIdAndUpdate(
      {
        _id: id,
      },
      req.body,
      { new: true }
    );
    res
      .status(201)
      .json({ message: "Blog Updated Successfully!", data: editPost });
  } catch (error) {
    console.log("Error in update blog post controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id });
    if (!id) {
      return res.status(400).json({ message: "Blog Post doesnt exist" });
    }
    if (post.author._id !== _id) {
      return res
        .status(400)
        .json({ message: "Forbidden, Only author can delete the blog" });
    }
    if (post.status === "approved") {
      return res
        .status(400)
        .json({ message: "Published Blogs cannot be deleted!" });
    }

    const deletePost = await Post.deleteOne({ _id: id });
    if (!deletePost) {
      return res.status(400).json({ message: "Error in deleting the blog!" });
    }
    res.status(201).json({ message: "Blog Post deleted successfully!" });
  } catch (error) {
    console.log("Error in delete blog post controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

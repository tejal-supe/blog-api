import Postreview from "../models/postreview.model.js";
import Post from "../models/post.model.js";

export const getAllPendingPost = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await Post.countDocuments({ status: "pending" });

    const posts = await Post.find({ status: "pending" })
      .populate("author", "firstName email")
      .populate("categories", "title slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (!posts) {
      return res.status(400).json({ message: "Error in retreiving the Posts" });
    }

    res.status(201).json({
      message: "Data fetched successfully!",
      data: posts,
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log("Error in get all pending post controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const approveBlogPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const post = await Post.findOne({ _id: id });
    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }
    if (post.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending posts can be approved!" });
    }

    const approved = await Postreview.create({
      post: id,
      reviewer: _id,
      previousStatus: post.status,
      newStatus: "approved",
      action: "approve",
    });
    post.status = "approved";
    await post.save();
    if (!approved) {
      return res
        .status(401)
        .json({ message: "Error in approving the blog post" });
    }
    res.status(201).json({ message: "Post approved successfully!" });
  } catch (error) {
    console.log("Error in approve blog post controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const rejectBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const { comment } = req.body;
    const post = await Post.findOne({ _id: id });
    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }
    if (post.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending posts can be rejected!" });
    }

    const rejected = await Postreview.create({
      post: id,
      reviewer: _id,
      previousStatus: post.status,
      newStatus: "rejected",
      action: "reject",
      comments: comment,
    });
    post.status = "rejected";
    post.rejectReason = comment;
    await post.save();

    if (!rejected) {
      return res
        .status(401)
        .json({ message: "Error in rejecting the blog post" });
    }
    res.status(201).json({ message: "Post Rejected successfully!" });
  } catch (error) {
    console.log("Error in reject blog post controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

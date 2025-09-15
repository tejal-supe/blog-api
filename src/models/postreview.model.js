import mongoose from "mongoose";

const postreviewSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      enum: ["approve", "reject"],
      required: true,
    },
    comments: {
      type: String,
      maxlength: [500, "Comments cannot exceed 500 characters"],
    },
    previousStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
    },
    newStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      required: true,
    },
  },
  { timestamps: true }
);

const Postreview = mongoose.model("Postreview", postreviewSchema);
export default Postreview;

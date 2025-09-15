import mongoose from "mongoose";
import slugify from "slugify";
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    rejectReason: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

postSchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true }).slice(
      0,
      200
    );
  }
  next();
});
const Post = mongoose.model("Post", postSchema);
export default Post;

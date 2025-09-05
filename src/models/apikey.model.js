import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
      default: () => crypto.randomBytes(16).toString("hex"),
    },
    name: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timeseries: true }
);

const ApiKey = mongoose.model("ApiKey",apiKeySchema);
export default ApiKey;
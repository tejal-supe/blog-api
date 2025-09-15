import ApiKey from "../models/apikey.model.js";

export const authenticateAPIKey = async (req, res, next) => {
  try {
    const apiKey = req.header("X-API-Key");

    if (!apiKey) {
      return res.status(401).json({ message: "API key required." });
    }

    const keyDoc = await ApiKey.findOne({ key: apiKey }).populate("user");

    if (!keyDoc) {
      return res.status(401).json({ message: "API key Invalid." });
    }

    if (keyDoc.isExpired) {
      return res.status(401).json({ message: "API key Expired." });
    }

    req.user = keyDoc.user;
    next();
  } catch (error) {
    console.log("Error in api key middleware", error);
  }
};

import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  username: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: {type: String, required: true},
  cookingTime: {type: Number, required: true},
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  }
});

export const PostModel = mongoose.model("posts", PostSchema);

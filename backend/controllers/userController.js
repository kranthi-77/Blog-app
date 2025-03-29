import User from "../models/userModel.js";
import Post from '../models/postsModel.js'

export const getUserSavedPosts = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });
  console.log(user)
  const savedPosts = await Promise.all(
    user.savedPosts.map(async (postId) => {
      return await Post.findById(postId).populate("user", "username");
    })
  );

  const filteredPosts = savedPosts.filter(post => post !== null);

  res.status(200).json(filteredPosts);
};

export const savePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.body.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });

  const isSaved = user.savedPosts.some((p) => p === postId);

  if (!isSaved) {
    await User.findByIdAndUpdate(user._id, {
      $push: { savedPosts: postId },
    });
  } else {
    await User.findByIdAndUpdate(user._id, {
      $pull: { savedPosts: postId },
    });
  }
  res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
};

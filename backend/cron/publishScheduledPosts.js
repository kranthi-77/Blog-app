import cron from "node-cron";
import Post from "../models/postsModel.js";

cron.schedule("*/1 * * * *", async () => {
  try {
    const now = new Date();
    const postsToPublish = await Post.find({
      status: "scheduled",
      publishAt: { $lte: now },
    });

    for (const post of postsToPublish) {
      post.status = "published";
      await post.save();
      console.log(`[CRON] Published post: ${post.title}`);
    }
  } catch (error) {
    console.error("[CRON] Error publishing scheduled posts:", error.message);
  }
});

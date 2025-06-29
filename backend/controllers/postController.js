import dotenv from 'dotenv';
dotenv.config();
import ImageKit from "imagekit";
import Post from "../models/postsModel.js"
import User from "../models/userModel.js"


export const getPosts = async (req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;

    const query = {};

    query.status = 'published';
    query.publishAt = { $lte: new Date() };
    const cat = req.query.cat;
    const author = req.query.author;
    const searchQuery = req.query.search;
    const sortQuery = req.query.sort;
    const featured = req.query.featured;

    if (cat) {
        query.category = cat;
      }
    
      if (searchQuery) {
        query.title = { $regex: searchQuery, $options: "i" };
      }
    
      if (author) {
        const user = await User.findOne({ username: author }).select("_id");
    
        if (!user) {
          return res.status(404).json("No post found!");
        }
    
        query.user = user._id;
      }
    
      let sortObj = { createdAt: -1 };
    
      if (sortQuery) {
        switch (sortQuery) {
          case "newest":
            sortObj = { createdAt: -1 };
            break;
          case "oldest":
            sortObj = { createdAt: 1 };
            break;
          case "popular":
            sortObj = { visit: -1 };
            break;
          case "trending":
            sortObj = { visit: -1 };
            query.createdAt = {
              $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
            };
            break;
          default:
            break;
        }
      }
    
      if (featured) {
        query.isFeatured = true;
      }
    
      const posts = await Post.find(query)
      .populate("user", "username")
      .sort(sortObj)
      .limit(limit)
      .skip((page - 1) * limit);
  
    const totalPosts = await Post.countDocuments();
    const hasMore = page * limit < totalPosts;
  
    res.status(200).json({ posts, hasMore });
  };

  export const getUserPosts = async (req,res) => {
    try {
      const clerkUserId = req.auth.userId
      const user = await User.findOne({clerkUserId})
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const userPosts = await Post.find({ user: user._id}).populate("user", "username")
  
      res.status(200).json(userPosts)
    } catch (error) {
      console.error("Error fetching user posts:", error);
      res.status(500).json({ error: "Failed to fetch user posts" })
    }
  }

export const getPost = async (req,res)=>{
    try {
        const post = await Post.findOne({ slug: req.params.slug }).populate(
            "user",
            "username img"
          );
          res.status(200).json(post);

    } catch (error) {
        console.log(error)
    }
    
}

export const createPost = async (req,res)=>{
    try {
        const clerkUserId = req.auth.userId
        if(!clerkUserId){
            return res.status(401).json("Not authenticated")
        }
        const user =await User.findOne({clerkUserId})
        if(!user){
            return res.status(404).json("user not found") 
        } 
        let slug = req.body.title.toLowerCase()
                      .replace(/[^\w\s-]/g, '')  
                      .trim()                  
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-');  
        let existingPost = await Post.findOne({ slug });

        let counter = 2;

        while (existingPost) {
            slug = `${slug}-${counter}`;
            existingPost = await Post.findOne({ slug });
            counter++;
        }

        const { publishAt, ...rest } = req.body;

        let parsedPublishAt = publishAt ? new Date(publishAt) : new Date();
        if (isNaN(parsedPublishAt.getTime())) parsedPublishAt = new Date();

        const isScheduled = parsedPublishAt > new Date();

        const newPost = new Post({
          user: user._id,
          slug,
          publishAt: parsedPublishAt,
          status: isScheduled ? 'scheduled' : 'published',
          ...rest
        });
        const post = await newPost.save()
        res.status(200).json(post)
        
    } catch (error) {
        console.log(error)
    }
    
}

// PATCH /api/edit/:id
export const editPost = async (req,res) => {
    const clerkUserId = req.auth.userId;

    if (!clerkUserId) {
      return res.status(401).json("Not authenticated!");
    }

    const role = req.auth.sessionClaims?.metadata?.role || "user";

    let post;

    if (role === "admin") {
      post = await Post.findById(req.params.id);
    } else {
      const user = await User.findOne({ clerkUserId });
      post = await Post.findOne({ _id: req.params.id, user: user?._id });
    }

    if (!post) {
      // Silently ignore or return minimal response
      return res.status(200).json(null); // or return unchanged/null safely
    }

    // Avoid updating immutable fields
    const { user: _ignoreUser, ...allowedFields } = req.body;
    
    allowedFields.slug = req.body.title.toLowerCase()
                      .replace(/[^\w\s-]/g, '')  
                      .trim()                  
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-');  
    
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: allowedFields },
      { new: true }
    );

    res.status(200).json(updatedPost);

  
}

export const deletePost = async (req,res)=>{
    const clerkUserId = req.auth.userId;

    if (!clerkUserId) {
        return res.status(401).json("Not authenticated!");
    }

    const role = req.auth.sessionClaims?.metadata?.role || "user";

    if (role === "admin") {
        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json("Post has been deleted");
    }

    const user = await User.findOne({ clerkUserId });

    const deletedPost = await Post.findOneAndDelete({
        _id: req.params.id,
        user: user._id,
    });

    if (!deletedPost) {
        return res.status(403).json("You can delete only your posts!");
    }

    res.status(200).json("Post has been deleted");
    
}

export const featurePost = async (req, res) => {
    const clerkUserId = req.auth.userId;
    const postId = req.body.postId;
  
    if (!clerkUserId) {
      return res.status(401).json("Not authenticated!");
    }
  
    const role = req.auth.sessionClaims?.metadata?.role || "user";
  
    if (role !== "admin") {
      return res.status(403).json("You cannot feature posts!");
    }
  
    const post = await Post.findById(postId);
  
    if (!post) {
      return res.status(404).json("Post not found!");
    }
  
    const isFeatured = post.isFeatured;
  
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        isFeatured: !isFeatured,
      },
      { new: true }
    );
  
    res.status(200).json(updatedPost);
  };

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
  });

export const uploadAuth = async (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
  };
  
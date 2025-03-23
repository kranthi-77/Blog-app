import dotenv from 'dotenv';
dotenv.config();
import ImageKit from "imagekit";
import Post from "../models/postsModel.js"
import User from "../models/userModel.js"


export const getPosts = async (req,res)=>{
    try {
        const posts = await Post.find()
        res.status(200).send(posts)
    } catch (error) {
        console.log(error)
    }
}

export const getPost = async (req,res)=>{
    try {
        const post = await Post.findOne({slug:req.params.slug})
        res.status(200).send(post)
    } catch (error) {
        console.log(error)
    }
    
}

export const createPost = async (req,res)=>{
    try {
        const clerkUserId = req.auth.userId
        console.log(clerkUserId)
        if(!clerkUserId){
            return res.status(401).json("Not authenticated")
        }
        const user =await User.findOne({clerkUserId})
        if(!user){
            return res.status(404).json("user not found") 
        } 
        let slug = req.body.title.replace(/ /g,'-').toLowerCase()
        let existingPost = await Post.findOne({ slug });

        let counter = 2;

        while (existingPost) {
            slug = `${slug}-${counter}`;
            existingPost = await Post.findOne({ slug });
            counter++;
        }

        const newPost = new Post({user:user._id,slug,...req.body})
        const post = await newPost.save()
        res.status(200).json(post)
        
    } catch (error) {
        console.log(error)
    }
    
}

export const deletePost = async (req,res)=>{
    const clerkUserId = req.auth.userId;

    if (!clerkUserId) {
        return res.status(401).json("Not authenticated!");
    }

    // const role = req.auth.sessionClaims?.metadata?.role || "user";

    // if (role === "admin") {
    //     await Post.findByIdAndDelete(req.params.id);
    //     return res.status(200).json("Post has been deleted");
    // }

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

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
  });

export const uploadAuth = async (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
  };
  
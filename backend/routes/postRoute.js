import express from 'express'
import { getUserPosts,getPosts,getPost,createPost,deletePost,uploadAuth, featurePost } from '../controllers/postController.js'
import increaseVisit from '../middlewares/increaseVisit.js'
const router =express.Router()

router.get('/upload-auth',uploadAuth)
router.get('/my-posts',getUserPosts)
router.get('/', getPosts)
router.get('/:slug',increaseVisit, getPost)
router.post('/', createPost)
router.delete('/:id', deletePost)
router.patch('/feature',featurePost)

export default router
import express from 'express'
import { getPosts, createPost, deletePost, updatePost, getPostById } from '../controllers/postController'

const postRoutes = express.Router()

postRoutes.get('/posts', getPosts)
postRoutes.post('/posts', createPost)
postRoutes.get('/posts/:id', getPostById)
postRoutes.put('/posts/:id', updatePost)
postRoutes.delete('/posts/:id', deletePost)
export default postRoutes
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Post from '~/models/postModel'

// Get All
export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.find()
    res.status(200).json({ message: 'Lấy danh sách bài viết thành công!', post })
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bài viết', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
// Get By ID
export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'ID không hợp lệ!' })
      return
    }
    const post = await Post.findById(req.params.id)
    if (!post) {
      res.status(404).json({ message: 'Bài viết không tồn tại!' })
      return
    }
    res.status(200).json({ message: 'Lấy bài viết theo id thành công!', post })
  } catch (error) {
    console.error('Lỗi khi lấy bài viết!', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
// Post
export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const newPost = await Post.create(req.body)
    const savedPost = await newPost.save()
    res.status(201).json({ message: 'Tạo bài viết thành công!', savedPost })
  } catch (error) {
    console.error('Lỗi khi tạo bài viết!', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
// Put
export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedPost) {
      res.status(404).json({ message: 'Bài viết không tồn tại!' })
      return
    }
    res.status(200).json({ message: 'Cập nhật bài viết thành công!', updatedPost })
  } catch (error) {
    console.error('Lỗi khi cập nhật bài viết', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
// Delete
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id)
    if (!deletedPost) {
      res.status(404).json({ message: 'bài viết không tồn tại!' })
      return
    }
    res.status(200).json({ message: 'Xoá bài viết thành công!', deletedPost })
  } catch (error) {
    console.error('Lỗi khi xoá bài viết', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}

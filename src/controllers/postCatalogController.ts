import { Request, Response } from 'express'
import PostCatalog from '../models/postCatalogModel'

// Get All
export const getAllPostCatalogs = async (req: Request, res: Response): Promise<void> => {
    try {
        const postCatalogs = await PostCatalog.find()
        res.status(200).json({ message: 'Lấy danh sách loại bài viết thành công!', postCatalogs })
    } catch (error) {
        console.error('Lỗi khi lấy danh sách Loại bài viết!', error)
        res.status(500).json({ message: 'Lỗi máy chủ!' })
    }
}

// Get By ID
export const getPostCatalogById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const postCatalog = await PostCatalog.findById(id)
        if (!postCatalog) {
            res.status(404).json({ message: 'Loại bài viết không tồn tại!' })
            return
        }
        res.status(200).json({ message: 'Lấy loại bài viết theo id thành công!', postCatalog })
    } catch (error) {
        console.error('Lỗi khi lấy Loại bài viết!', error)
        res.status(500).json({ message: 'Lỗi máy chủ!' })
    }
}

// Post
export const createPostCatalog = async (req: Request, res: Response): Promise<void> => {
    try {
        const newPostCatalog = await PostCatalog.create(req.body)
        const savedPostCatalog = await newPostCatalog.save()
        res.status(201).json({ message: 'Tạo loại bài viết thành công!', savedPostCatalog })
    } catch (error) {
        console.error('Lỗi khi tạo loại bài viết!', error)
        res.status(500).json({ message: 'Lỗi tạo loại bài viết!', error })
    }
}

// Put
export const updatePostCatalog = async (req: Request, res: Response): Promise<void> => {
    try {
    const updatedPostCatalog= await PostCatalog.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedPostCatalog) {
            res.status(404).json({ message: 'Loại bài viết không tồn tại!' })
            return
        }
        res.status(200).json({ message: 'Cập nhật loại bài viết thành công!', updatedPostCatalog })
    } catch (error) {
        console.error('Lỗi khi cập nhật loại bài viết!', error)
        res.status(500).json({ message: 'Lỗi máy chủ!' })
    }
}

// Delete
export const deletePostCatalog = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const deletedPostCatalog = await PostCatalog.findByIdAndDelete(id)
        if (!deletedPostCatalog) {
            res.status(404).json({ message: 'Loại bài viết không tồn tại!' })
            return
        }
        res.status(200).json({ message: 'Xóa loại bài viết thành công!', deletedPostCatalog })
    } catch (error) {
        console.error('Lỗi khi xóa Loại bài viết', error)
        res.status(500).json({ message: 'Lỗi máy chủ' })
    }
}

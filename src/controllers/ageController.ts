import { Request, Response } from 'express'
import Age from '../models/ageModel'

// Get All
export const getAllAge = async (req: Request, res: Response): Promise<void> => {
  try {
    const ages = await Age.find()
    res.status(200).json({ message: 'Lấy danh sách lứa tuổi thành công!', ages })
  } catch (error) {
    console.error('Lỗi khi lấy danh sách địa điểm!', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
// Get By ID
export const getAgeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const age = await Age.findById(req.params.id)
    if (!age) {
      res.status(404).json({ message: 'Lứa tuổi không tìm thấy!' })
      return
    }
    res.status(200).json({message:'Lấy lứa tuổi theo id thành công!', age})
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy lứa tuổi', error })
  }
}

// Post
export const createAge = async (req: Request, res: Response): Promise<void> => {
  try {
    const newAge = await Age.create(req.body)
    const savedAge = await newAge.save()
    res.status(201).json({message: 'Tạo lứa tuổi thành công!', savedAge})
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo lứa tuổi!', error })
  }
}

// Put
export const updateAge = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedAge = await Age.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedAge) {
      res.status(404).json({ message: 'Lứa tuổi không tìm thấy!' })
      return
    }
    res.status(200).json({message:'Cập nhật lứa tuổi thành công!', updatedAge})
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật lứa tuổi!', error })
  }
}

// Delete
export const deleteAge = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedAge = await Age.findByIdAndDelete(req.params.id)
    if (!deletedAge) {
      res.status(404).json({ message: 'Lứa tuổi không tìm thấy!' })
      return
    }
    res.status(200).json({ message: 'Xóa thành công lứa tuổi!' })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa lứa tuổi!', error })
  }
}

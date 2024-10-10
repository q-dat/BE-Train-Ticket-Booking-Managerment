import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Seat from '~/models/seatModel'

// Get All
export const getSeats = async (req: Request, res: Response): Promise<void> => {
  try {
    const seats = await Seat.find().populate('seat_catalog_id', 'name')
    res.status(200).json({ message: 'Lấy danh sách ghế thành công!', seats })
  } catch (error) {
    console.error('Lỗi khi lấy danh sách ghế', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
// Get By ID
export const getSeatById = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'ID không hợp lệ!' })
      return
    }
    const seat = await Seat.findById(req.params.id).populate('seat_catalog_id', 'name')
    if (!seat) {
      res.status(404).json({ message: 'Ghế không tồn tại!' })
      return
    }
    res.status(200).json({ messega: 'Lấy ghế theo id thành công!', seat })
  } catch (error) {
    console.error('Lỗi khi lấy ghế theo id', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
// Post
export const createSeat = async (req: Request, res: Response): Promise<void> => {
  try {
    const newSeat = await Seat.create(req.body)
    const savedSeat = await newSeat.save()
    res.status(201).json({ message: 'Tạo ghế thành công!', savedSeat })
  } catch (error) {
    console.error('Lỗi khi tạo ghế!', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
// Put
export const updateSeat = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedSeat = await Seat.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedSeat) {
      res.status(404).json({ message: 'Ghế không tồn tại!' })
      return
    }
    res.status(200).json({ message: 'Cập nhật ghế thành công!', updatedSeat })
  } catch (error) {
    console.error('Lỗi khi cập nhật ghế', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
// Delete
export const deleteSeat = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedSeat = await Seat.findByIdAndDelete(req.params.id)
    if (!deletedSeat) {
      res.status(404).json({ message: 'Ghế không tồn tại!' })
      return
    }
    res.status(200).json({ message: 'Xoá ghế thành công!', deletedSeat })
  } catch (error) {
    console.error('Lỗi khi xoá ghế', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}

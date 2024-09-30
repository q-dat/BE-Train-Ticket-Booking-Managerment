import { Request, Response } from 'express'
import SeatCatalog from '~/models/seatCatalogModel'

//Get All
export const getSeatCataLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const seatCatalogs = await SeatCatalog.find()
    res.status(200).json({ message: 'Lấy danh sách danh mục ghế thành công!', seatCatalogs })
  } catch (error) {
    console.error('Lỗi khi lấy danh sách danh mục ghế!')
    res.status(500).json({ message: 'Lỗii máy chủ!' })
  }
}
//Get By ID
export const getSeatCatalogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const seatCatalog = await SeatCatalog.findById(req.params.id)
    if (!seatCatalog) {
      res.status(404).json({ message: 'Không tìm thấy danh mục ghế!' })
      return
    }
    res.status(200).json({ message: 'Lấy danh mục ghế thành công!', seatCatalog })
  } catch (error) {
    console.error('Lỗi khi lấy danh mục ghế!', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
//Post
export const createSeatCatalog = async (req: Request, res: Response): Promise<void> => {
  try {
    const newSeatCatalog = await SeatCatalog.create(req.body)
    const savedSeatCatalog = await newSeatCatalog.save()
    res.status(201).json({ message: 'Tạo danh mục ghế thành công!', savedSeatCatalog })
  } catch (error) {
    console.error('Lỗi khi tạo danh mục ghế!', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
//Put
export const updateSeatCatalog = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedSeatCatalog = await SeatCatalog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedSeatCatalog) {
      res.status(404).json({ message: 'Không tìm thấy danh mục ghế!' })
      return
    }
    res.status(200).json({ message: 'Cập nhật danh mục ghế thành công!', updatedSeatCatalog })
  } catch (error) {
    console.error('Lỗi khi cập nhật danh mục ghế!', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
//Delete
export const deleteSeatCatalog = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedSeatCatalog = await SeatCatalog.findByIdAndDelete(req.params.id)
    if (!deletedSeatCatalog) {
      res.status(404).json({ message: 'Không tìm thấy danh mục ghế!' })
      return
    }
    res.status(200).json({ message: 'Xoá danh mục ghế thành công!', deletedSeatCatalog })
  } catch (error) {
    console.error('Lỗi khi xoá danh mục ghế!', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}

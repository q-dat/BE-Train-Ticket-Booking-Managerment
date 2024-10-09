import { Request, Response } from 'express'
import mongoose from 'mongoose'
import TicketCatalog from '../models/ticketCatalogModel'

// Get All
export const getAllTicketCatalogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const ticketCatalogs = await TicketCatalog.find()
    res.status(200).json({ message: 'Lấy danh sách loại vé thành công!', ticketCatalogs })
  } catch (error) {
    console.error('Lỗi khi lấy danh sách loại vé!', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}

// Get By ID
export const getTicketCatalogById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'ID không hợp lệ!' })
      return
    }
    const ticketCatalog = await TicketCatalog.findById(id)
    if (!ticketCatalog) {
      res.status(404).json({ message: 'Loại vé không tồn tại!' })
      return
    }
    res.status(200).json({ message: 'Lấy loại vé theo id thành công!', ticketCatalog })
  } catch (error) {
    console.error('Lỗi khi lấy loại vé!', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}

// Post
export const createTicketCatalog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body
    const existingTicketCatalog = await TicketCatalog.findOne({ name })
    if (existingTicketCatalog) {
      res.status(400).json({ message: 'Loại vé đã tồn tại!' })
      return
    }
    const newTicketCatalog = await TicketCatalog.create(req.body)
    const savedTicketCatalog = await newTicketCatalog.save()
    res.status(201).json({ message: 'Tạo loại vé thành công!', savedTicketCatalog })
  } catch (error) {
    console.error('Lỗi khi tạo loại vé!', error)
    res.status(500).json({ message: 'Lỗi tạo loại vé!', error })
  }
}

// Put
export const updateTicketCatalog = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedTicketCatalog = await TicketCatalog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedTicketCatalog) {
      res.status(404).json({ message: 'Loại vé không tồn tại!' })
      return
    }
    res.status(200).json({ message: 'Cập nhật loại vé thành công!', updatedTicketCatalog })
  } catch (error) {
    console.error('Lỗi khi cập nhật loại vé!', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}

// Delete
export const deleteTicketCatalog = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTicketCatalog = await TicketCatalog.findByIdAndDelete(req.params.id)
    if (!deletedTicketCatalog) {
      res.status(404).json({ message: 'Loại vé không tồn tại!' })
      return
    }
    res.status(200).json({ message: 'Xóa loại vé thành công!', deletedTicketCatalog })
  } catch (error) {
    console.error('Lỗi khi xóa loại vé', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
}

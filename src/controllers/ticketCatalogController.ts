import { Request, Response } from 'express'
import TicketCatalog from '../models/ticketCatalogModel'

// Get All
export const getAllTicketCatalogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const ticketCatalogs = await TicketCatalog.find()
    res.status(200).json({ message: 'Lấy danh sách loại vé thành công!', ticketCatalogs })
  } catch (error) {
    console.error('Lỗi khi lấy danh sách loại vé', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
}

// Post
export const createTicketCatalog = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTicketCatalog = await TicketCatalog.create(req.body)
    const savedSeat = await newTicketCatalog.save()
    res.status(201).json(savedSeat)
  } catch (error) {
    console.error('Lỗi khi tạo loại vé', error)
    res.status(500).json({ message: 'Lỗi tạo loại vé', error })
  }
}

// Put
export const updateTicketCatalog = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { ten } = req.body
  try {
    const ticketCatalog = await TicketCatalog.findByIdAndUpdate(id, { ten }, { new: true })
    if (!ticketCatalog) {
      res.status(404).json({ message: 'Loại vé không tồn tại!' })
      return
    }
    res.status(200).json({ message: 'Cập nhật loại vé thành công!', ticketCatalog })
  } catch (error) {
    console.error('Lỗi khi cập nhật loại vé', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
}

// Delete
export const deleteTicketCatalog = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const ticketCatalog = await TicketCatalog.findByIdAndDelete(id)
    if (!ticketCatalog) {
      res.status(404).json({ message: 'Loại vé không tồn tại!' })
      return
    }
    res.status(200).json({ message: 'Xóa loại vé thành công!' })
  } catch (error) {
    console.error('Lỗi khi xóa loại vé', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
}

// Get By ID
export const getTicketCatalogById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const ticketCatalog = await TicketCatalog.findById(id)
    if (!ticketCatalog) {
      res.status(404).json({ message: 'Loại vé không tồn tại!' })
      return
    }
    res.status(200).json({ message: 'Lấy loại vé thành công!', ticketCatalog })
  } catch (error) {
    console.error('Lỗi khi lấy loại vé', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
}

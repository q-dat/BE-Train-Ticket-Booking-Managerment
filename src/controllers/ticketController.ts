import { Request, Response } from 'express'
import Ticket from '~/models/ticketModel'

// Get All
export const getAllTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const tickets = await Ticket.find()
      .populate('vehicle_id', 'name status')
      .populate('ticket_catalog_id', 'name')
      .populate({
        path: 'trip_id',
        select: '-createAt -updateAt -__v',
        populate: [
          { path: 'departure_point', select: 'name' },
          { path: 'destination_point', select: 'name' }
        ]
      })

    res.status(200).json({ message: 'Lấy danh sách vé thành công!', tickets })
  } catch (error) {
    console.error({ message: 'Lỗi khi lấy danh sách vé!', error })
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
// Get By ID
export const getTicketById = async (req: Request, res: Response): Promise<void> => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('vehicle_id', 'name status')
      .populate('ticket_catalog_id', 'name')
      .populate({
        path: 'trip_id',
        select: '-createAt -updateAt -__v',
        populate: [
          { path: 'departure_point', select: 'name' },
          { path: 'destination_point', select: 'name' }
        ]
      })

    if (!ticket) {
      res.status(404).json({ message: 'Vé không tồn tại!' })
      return
    }

    res.status(200).json({ message: 'Lấy vé theo ID thành công!', ticket })
  } catch (error) {
    console.error({ message: 'Lỗi khi lấy vé!', error })
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}

// Post
export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTicket = new Ticket(req.body)
    const savedTicket = await newTicket.save()

    res.status(201).json({ message: 'Tạo vé thành công!', ticket: savedTicket })
  } catch (error) {
    console.error({ message: 'Lỗi khi tạo vé!', error })
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}

// Put
export const updateTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('vehicle_id')
      .populate('ticket_catalog_id')
      .populate('trip_id')

    if (!updatedTicket) {
      res.status(404).json({ message: 'Vé không tồn tại!' })
      return
    }

    res.status(200).json({ message: 'Cập nhật vé thành công!', ticket: updatedTicket })
  } catch (error) {
    console.error({ message: 'Lỗi khi cập nhật vé!', error })
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}

// Delete
export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id)

    if (!deletedTicket) {
      res.status(404).json({ message: 'Vé không tồn tại!' })
      return
    }

    res.status(200).json({ message: 'Xóa vé thành công!' })
  } catch (error) {
    console.error({ message: 'Lỗi khi xóa vé!', error })
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}

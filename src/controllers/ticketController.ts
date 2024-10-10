import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Seat, { ISeat } from '~/models/seatModel'
import TicketCatalog from '~/models/ticketCatalogModel'
import Ticket from '~/models/ticketModel'
import Trip, { ITrip } from '~/models/tripModel'
import Location from '~/models/locationModel'

// Get All
export const getAllTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const tickets = await Ticket.find()
      .populate({
        path: 'seat_id',
        select: '-createAt -updateAt -__v',
        populate: {
          path: 'seat_catalog_id',
          select: '-createAt -updateAt -__v',
          populate: {
            path: 'vehicle_id',
            select: '-createAt -updateAt -__v'
          }
        }
      })

      .populate('ticket_catalog_id', 'name')
      .populate({
        path: 'trip_id',
        select: '-createAt -updateAt -__v',
        populate: [
          { path: 'departure_point', select: '-createAt -updateAt -__v' },
          { path: 'destination_point', select: '-createAt -updateAt -__v' }
        ]
      })
    tickets.forEach((ticket: any) => {
      const seatPrice = ticket.seat_id?.price || 0
      const tripPrice = ticket.trip_id?.price || 0
      ticket.price = seatPrice + tripPrice
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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'ID không hợp lệ!' })
      return
    }
    const ticket = await Ticket.findById(req.params.id)
    .populate({
      path: 'seat_id',
      select: '-createAt -updateAt -__v',
      populate: {
        path: 'seat_catalog_id',
        select: '-createAt -updateAt -__v',
        populate: {
          path: 'vehicle_id',
          select: '-createAt -updateAt -__v',
        }
      }
    })

    .populate('ticket_catalog_id', 'name')
    .populate({
      path: 'trip_id',
      select: '-createAt -updateAt -__v',
      populate: [
        { path: 'departure_point',
        select: '-createAt -updateAt -__v',
      },
        { path: 'destination_point',
        select: '-createAt -updateAt -__v',
      }
      ]
    })
    if (!ticket) {
      res.status(404).json({ message: 'Vé không tồn tại!' })
      return
    }
    const seatId = ticket.seat_id as unknown as ISeat
    const seatPrice = seatId?.price || 0

    const tripId = ticket.trip_id as unknown as { price: number }
    const tripPrice = tripId?.price || 0

    ticket.price = seatPrice + tripPrice

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
      .populate('seat_id')
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
//Search
export const searchTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      ticket_catalog_name,
      seat_name,
      departure_point_name,
      destination_point_name,
      departure_date,
      return_date
    } = req.query

    const query: { [key: string]: any } = {}
    const tripQuery: { [key: string]: any } = {}
    let isValidSearch = false

    if (!ticket_catalog_name) {
      res.status(400).json({ message: 'Cần cung cấp loại vé!' })
      return
    }

    const ticketCatalog = await TicketCatalog.findOne({
      name: { $regex: ticket_catalog_name, $options: 'i' }
    })

    if (!ticketCatalog) {
      res.status(404).json({ message: 'Loại vé không hợp lệ!' })
      return
    } else {
      query.ticket_catalog_id = ticketCatalog._id
      isValidSearch = true
    }

    if (departure_point_name) {
      const departurePoint = await Location.findOne({
        name: { $regex: departure_point_name, $options: 'i' }
      })
      if (departurePoint) {
        tripQuery['departure_point'] = departurePoint._id
        isValidSearch = true
      } else {
        res.status(400).json({ message: 'Điểm khởi hành không hợp lệ!' })
        return
      }
    } else {
      res.status(400).json({ message: 'Cần cung cấp điểm khởi hành!' })
      return
    }

    if (destination_point_name) {
      const destinationPoint = await Location.findOne({
        name: { $regex: destination_point_name, $options: 'i' }
      })
      if (destinationPoint) {
        tripQuery['destination_point'] = destinationPoint._id
        isValidSearch = true
      } else {
        res.status(400).json({ message: 'Điểm đến không hợp lệ!' })
        return
      }
    } else {
      res.status(400).json({ message: 'Cần cung cấp điểm đến!' })
      return
    }

    if (departure_date && typeof departure_date === 'string') {
      const departureDate = new Date(departure_date)
      if (!isNaN(departureDate.getTime())) {
        tripQuery['departure_date'] = { $gte: departureDate }
        isValidSearch = true
      } else {
        res.status(400).json({ message: 'Ngày khởi hành không hợp lệ!' })
        return
      }
    }

    if (return_date && typeof return_date === 'string') {
      const returnDate = new Date(return_date)
      if (!isNaN(returnDate.getTime())) {
        tripQuery['return_date'] = { $lte: returnDate }
        isValidSearch = true
      } else {
        res.status(400).json({ message: 'Ngày đến không hợp lệ!' })
        return
      }
    }
    if (Object.keys(tripQuery).length > 0) {
      const trips = await Trip.find(tripQuery)
      if (trips.length > 0) {
        query.trip_id = { $in: trips.map((t) => t._id) }
      } else {
        res.status(404).json({ message: 'Không tìm thấy chuyến đi nào phù hợp!' })
        return
      }
    }
    const tickets = await Ticket.find(query)
    .populate({
      path: 'seat_id',
      select: '-createAt -updateAt -__v',
      populate: {
        path: 'seat_catalog_id',
        select: '-createAt -updateAt -__v',
        populate: {
          path: 'vehicle_id',
          select: '-createAt -updateAt -__v',
        }
      }
    })

    .populate('ticket_catalog_id', 'name')
    .populate({
      path: 'trip_id',
      select: '-createAt -updateAt -__v',
      populate: [
        { path: 'departure_point',
        select: '-createAt -updateAt -__v',
      },
        { path: 'destination_point',
        select: '-createAt -updateAt -__v',
      }
      ]
    })
    if (tickets.length === 0) {
      res.status(404).json({ message: 'Không tìm thấy vé nào phù hợp!' })
      return
    }
    tickets.forEach((ticket: any) => {
      const seatPrice = ticket.seat_id?.price || 0
      const tripPrice = ticket.trip_id?.price || 0
      ticket.price = seatPrice + tripPrice
    })

    res.status(200).json({ message: 'Lấy danh sách vé thành công!', tickets })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}

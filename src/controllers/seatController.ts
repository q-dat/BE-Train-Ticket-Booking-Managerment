import { Request, Response } from 'express'
import Seat from '~/models/seatModel'

// Get all
export const getSeats = async (req: Request, res: Response): Promise<void> => {
  try {
    const seats = await Seat.find()
    res.status(200).json({ message: 'Lấy danh sách ghế thành công!', seats })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seats', error })
  }
}
// Get by ID
export const getSeatById = async (req: Request, res: Response): Promise<void> => {
  try {
    const seat = await Seat.findById(req.params.id)
    if (!seat) {
      res.status(404).json({ message: 'Seat not found' })
      return
    }
    res.status(200).json(seat)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seat', error })
  }
}
// Post
export const createSeat = async (req: Request, res: Response): Promise<void> => {
  try {
    const newSeat = await Seat.create(req.body)
    const savedSeat = await newSeat.save()
    res.status(201).json(savedSeat)
  } catch (error) {
    res.status(500).json({ message: 'Error creating seat', error })
  }
}
// Put
export const updateSeat = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedSeat = await Seat.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedSeat) {
      res.status(404).json({ message: 'Seat not found' })
      return
    }
    res.status(200).json(updatedSeat)
  } catch (error) {
    res.status(500).json({ message: 'Error updating seat', error })
  }
}
// Delete
export const deleteSeat = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedSeat = await Seat.findByIdAndDelete(req.params.id)
    if (!deletedSeat) {
      res.status(404).json({ message: 'Seat not found' })
      return
    }
    res.status(200).json({ message: 'Seat deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting seat', error })
  }
}

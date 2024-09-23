import { Request, Response } from 'express'
import { Trip } from '~/models/tripModel'

// GET all trips
export const getTrips = async (req: Request, res: Response): Promise<void> => {
  try {
    const locations = await Trip.find().populate('diem_di', 'name').populate('diem_den', 'name')
    res.status(200).json({ message: 'Lấy danh sách chuyến đi thành công!', locations })
  } catch (error) {
    console.error('Lỗi khi lấy danh sách chuyến đi', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
}
// Create a new trip
export const createTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTrip = new Trip(req.body)
    const savedTrip = await newTrip.save()
    res.status(201).json(savedTrip)
  } catch (error) {
    res.status(500).json({ message: 'Error creating trip', error })
  }
}
// Search trips
export const searchTrips = async (req: Request, res: Response): Promise<void> => {
  try {
    const searchCriteria: { diem_di?: string; diem_den?: string; ngay_khoi_hanh?: Date } = {}

    if (req.query.diem_di) {
      searchCriteria.diem_di = req.query.diem_di as string
    }

    if (req.query.diem_den) {
      searchCriteria.diem_den = req.query.diem_den as string
    }

    if (req.query.ngay_khoi_hanh) {
      searchCriteria.ngay_khoi_hanh = new Date(req.query.ngay_khoi_hanh as string)
    }

    const trips = await Trip.find(searchCriteria).populate('diem_di', 'name').populate('diem_den', 'name')

    res.status(200).json(trips)
  } catch (error) {
    console.error('Lỗi khi tìm chuyến đi:', error)
    res.status(500).json({ message: 'Error searching trips', error })
  }
}

// Update a trip
export const updateTrip = async (req: Request, res: Response) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedTrip) {
      return res.status(404).json({ message: 'Trip not found' })
    }
    res.status(200).json(updatedTrip)
  } catch (error) {
    res.status(500).json({ message: 'Error updating trip', error })
  }
}

// Delete a trip
export const deleteTrip = async (req: Request, res: Response) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id)
    if (!deletedTrip) {
      return res.status(404).json({ message: 'Trip not found' })
    }
    res.status(200).json({ message: 'Trip deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trip', error })
  }
}

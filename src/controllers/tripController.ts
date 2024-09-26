import { Request, Response } from 'express'
import Trip from '~/models/tripModel'

// Get All
export const getTrips = async (req: Request, res: Response): Promise<void> => {
  try {
    const trips = await Trip.find().populate('diem_di', 'name').populate('diem_den', 'name')
    res.status(200).json({ message: 'Lấy danh sách chuyến đi thành công!', trips })
  } catch (error) {
    console.error('Lỗi khi lấy danh sách chuyến đi!', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
// Get By ID
export const getTripById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const location = await Trip.findById(id).populate('diem_di', 'name').populate('diem_den', 'name')
    if (!location) {
      res.status(404).json({ message: 'Chuyến đi không tồn tại!' })
      return
    }
    res.status(200).json({ message: 'Lấy chuyến đi thành công!', location })
  } catch (error) {
    console.error('Lỗi khi lấy chuyến đi!', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}

// Post
export const createTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTrip = new Trip(req.body)
    const savedTrip = await newTrip.save()
    res.status(201).json(savedTrip)
  } catch (error) {
    console.error({ message: 'Lỗi khi tạo chuyến đi!', error })
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
//Search
export const searchTrips = async (req: Request, res: Response): Promise<void> => {
  try {
    const searchTrip: { diem_di?: string; diem_den?: string; ngay_khoi_hanh?: Date } = {}

    if (req.query.diem_di) {
      searchTrip.diem_di = req.query.diem_di as string
    }

    if (req.query.diem_den) {
      searchTrip.diem_den = req.query.diem_den as string
    }

    if (req.query.ngay_khoi_hanh) {
      searchTrip.ngay_khoi_hanh = new Date(req.query.ngay_khoi_hanh as string)
    }

    const trips = await Trip.find(searchTrip).populate('diem_di', 'name').populate('diem_den', 'name')

    res.status(200).json({ message: 'Tìm kiếm chuyến đi thành công!', trips })
  } catch (error) {
    console.error('Lỗi khi tìm chuyến đi:', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
}
//Put
export const updateTrip = async (req: Request, res: Response) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedTrip) {
      return res.status(404).json({ message: 'Chuyến đi không tồn tại!' })
    }
    res.status(200).json({ messega: 'Cập nhật chuyến đi thành công!', updatedTrip })
  } catch (error) {
    console.error({ message: 'Lỗi khi cập nhật chuyến đi!', error })
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
export const deleteTrip = async (req: Request, res: Response) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id)
    if (!deletedTrip) {
      return res.status(404).json({ message: 'Chuyến đi không tồn tại!' })
    }
    res.status(200).json({ message: 'Xoá chuyến đi thành công!', deletedTrip })
  } catch (error) {
    console.error({ message: 'Lỗi khi cập nhật chuyến đi!', error })
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}

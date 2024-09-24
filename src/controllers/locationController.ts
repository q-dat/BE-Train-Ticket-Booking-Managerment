import { Request, Response } from 'express'
import Location from '../models/locationModel'

// Get All
export const getAllLocations = async (req: Request, res: Response): Promise<void> => {
  try {
    const locations = await Location.find()
    res.status(200).json({ message: 'Lấy danh sách địa điểm thành công!', locations })
  } catch (error) {
    console.error('Lỗi khi lấy danh sách địa điểm', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
// Get By ID
export const getLocationById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const location = await Location.findById(id)
    if (!location) {
      res.status(404).json({ message: 'Địa điểm không tồn tại!' })
      return
    }
    res.status(200).json({ message: 'Lấy địa điểm theo id thành công!', location })
  } catch (error) {
    console.error('Lỗi khi lấy địa điểm!', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
// Post
export const createLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const newLocation = await Location.create(req.body)
    const savedLocation = await newLocation.save()
    res.status(201).json({ message: 'Tạo địa điểm thành công!', savedLocation })
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo địa điểm!', error })
  }
}
// Put
export const updateLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedLocation) {
      res.status(404).json({ message: 'Địa điểm không tồn tại!' })
      return
    }
    res.status(200).json({ message: 'Cập nhật địa điểm thành công!', updatedLocation })
  } catch (error) {
    console.error('Lỗi khi cập nhật địa điểm', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
}
// Delete
export const deleteLocation = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const deletedLocation = await Location.findByIdAndDelete(id)
    if (!deletedLocation) {
      res.status(404).json({ message: 'Địa điểm không tồn tại!' })
      return
    }
    res.status(200).json({ message: 'Xóa địa điểm thành công!', deletedLocation })
  } catch (error) {
    console.error('Lỗi khi xóa địa điểm!', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}


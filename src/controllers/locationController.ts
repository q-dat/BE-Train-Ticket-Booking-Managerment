import { Request, Response } from 'express'
import Location from '../models/locationModel'

// Get All
export const getAllLocations = async (req: Request, res: Response): Promise<void> => {
  try {
    const locations = await Location.find()
    res.status(200).json({ message: 'Lấy danh sách địa điểm thành công!', locations })
  } catch (error) {
    console.error('Lỗi khi lấy danh sách địa điểm', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
}
// Post
export const createLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const NewLocation = await Location.create(req.body)
    const savedLocation= await NewLocation.save()
    res.status(201).json(savedLocation)
  } catch (error) {
    res.status(500).json({ message: 'Error creating location', error })
  }
}
// Put
export const updateLocation = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { ten } = req.body
  try {
    const location = await Location.findByIdAndUpdate(id, { ten }, { new: true })
    if (!location) {
      res.status(404).json({ message: 'Địa điểm không tồn tại!' })
      return
    }
    res.status(200).json({ message: 'Cập nhật địa điểm thành công!', location })
  } catch (error) {
    console.error('Lỗi khi cập nhật địa điểm', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
}
// Delete
export const deleteLocation = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const location = await Location.findByIdAndDelete(id)
    if (!location) {
      res.status(404).json({ message: 'Địa điểm không tồn tại!' })
      return
    }
    res.status(200).json({ message: 'Xóa địa điểm thành công!' })
  } catch (error) {
    console.error('Lỗi khi xóa địa điểm', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
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
    res.status(200).json({ message: 'Lấy địa điểm thành công!', location })
  } catch (error) {
    console.error('Lỗi khi lấy địa điểm', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
}
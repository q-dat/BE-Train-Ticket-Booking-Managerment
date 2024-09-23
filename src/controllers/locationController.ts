import { Request, Response } from 'express'
import Location from '../models/locationModel'

export const getAllLocations = async (req: Request, res: Response): Promise<void> => {
  try {
    const locations = await Location.find()
    res.status(200).json({ message: 'Lấy danh sách địa điểm thành công!', locations })
  } catch (error) {
    console.error('Lỗi khi lấy danh sách địa điểm', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
}
export const createLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const NewLocation = await Location.create(req.body)
    const savedLocation= await NewLocation.save()
    res.status(201).json(savedLocation)
  } catch (error) {
    res.status(500).json({ message: 'Error creating trip', error })
  }
}
export const updateLocation = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { name } = req.body
  try {
    const location = await Location.findByIdAndUpdate(id, { name }, { new: true })
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

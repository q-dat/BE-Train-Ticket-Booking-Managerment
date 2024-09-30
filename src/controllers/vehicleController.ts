import { Request, Response } from 'express'
import Vehicle from '~/models/vehicleModel'

//Get All
export const getVehicles = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicles = await Vehicle.find()
    res.status(200).json({ message: 'Lấy danh sách phương tiện thành công!', vehicles })
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phương tiện', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
//Get By ID
export const getVehicleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
    if (!vehicle) {
      res.status(404).json({ message: 'Phương tiện không tồn tại!' })
      return
    }
    res.status(200).json({ message: 'Lấy phương tiện theo id thành công!', vehicle })
  } catch (error) {
    console.error('Lỗi khi lấy phương tiện!', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
//Post
export const createVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const newVehicle = await Vehicle.create(req.body)
    const savedVehicle = await newVehicle.save()
    res.status(201).json({ message: 'Tạo phương tiện thành công!', savedVehicle })
  } catch (error) {
    console.error('Lỗi khi tạo phương tiện', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
//Put
export const updateVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedVehicle) {
      res.status(404).json({ message: 'Phương tiện không tồn tại!' })
      return
    }
    res.status(200).json({ message: 'Cập nhật phương tiện thành công!', updatedVehicle })
  } catch (error) {
    console.error('Lỗi khi cập nhật phương tiện!', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}
//Delete
export const deleteVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id)
    if (!deletedVehicle) {
      res.status(404).json({ message: 'Phương tiện không tồn tại!' })
      return
    }
    res.status(200).json({ message: 'Xóa phương tiện thành công!', deletedVehicle })
  } catch (error) {
    console.error('Lỗi khi xóa phương tiện!', error)
    res.status(500).json({ message: 'Lỗi máy chủ!' })
  }
}

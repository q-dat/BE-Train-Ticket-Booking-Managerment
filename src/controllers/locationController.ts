import { Request, Response } from 'express'
import Location from '../models/locationModel'

export const getAllLocations = async (req: Request, res: Response): Promise<void> => {
    try {
      const locations = await Location.find();
      res.status(200).json({ message: 'Lấy danh sách địa điểm thành công!', locations });
    } catch (error) {
      console.error('Lỗi khi lấy danh sách địa điểm', error);
      res.status(500).json({ message: 'Lỗi máy chủ' });
    }
  };
export const createLocation = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body
  try {
    const location = await Location.create({ name })
    res.status(201).json({ message: 'Địa điểm đã được tạo thành công!', location })
  } catch (error) {
    console.error('Lỗi khi tạo địa điểm', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
}

import { Request, Response } from 'express'
import Chair from '../models/chairModel'

// Get all
export const getChairs = async (req: Request, res: Response): Promise<void> => {
  try {
    const chairs = await Chair.find()
    res.status(200).json(chairs)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chairs', error })
  }
}
// Get by ID
export const getChairById = async (req: Request, res: Response): Promise<void> => {
  try {
    const chair = await Chair.findById(req.params.id)
    if (!chair) {
      res.status(404).json({ message: 'Chair not found' })
      return
    }
    res.status(200).json(chair)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chair', error })
  }
}
// Post
export const createChair = async (req: Request, res: Response): Promise<void> => {
  try {
    const newChair = await Chair.create(req.body)
    const savedChair = await newChair.save()
    res.status(201).json(savedChair)
  } catch (error) {
    res.status(500).json({ message: 'Error creating chair', error })
  }
}
// Put
export const updateChair = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedChair = await Chair.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedChair) {
      res.status(404).json({ message: 'Chair not found' })
      return
    }
    res.status(200).json(updatedChair)
  } catch (error) {
    res.status(500).json({ message: 'Error updating chair', error })
  }
}
// Delete
export const deleteChair = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedChair = await Chair.findByIdAndDelete(req.params.id)
    if (!deletedChair) {
      res.status(404).json({ message: 'Chair not found' })
      return
    }
    res.status(200).json({ message: 'Chair deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting chair', error })
  }
}

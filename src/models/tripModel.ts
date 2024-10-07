import mongoose, { Schema, Document } from 'mongoose'
import { ILocation } from './locationModel'

export interface ITrip extends Document {
  _id: mongoose.Types.ObjectId
  departure_point: ILocation['_id']
  destination_point: ILocation['_id']
  price: Number
  departure_date: Date
  departure_time: string
  return_date: Date
  return_time: string
  createAt: Date
  updateAt: Date
}

const TripSchema: Schema = new Schema({
  departure_point: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  destination_point: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  price: { type: Number, required: true },
  departure_date: { type: Date, required: true },
  departure_time: { type: String, required: true },
  return_date: { type: Date, required: true },
  return_time: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})
TripSchema.pre<ITrip>('save', function (next) {
  this.updateAt = new Date()
  next()
})
TripSchema.pre<ITrip>('updateOne', function (next) {
  this.set({ updateAt: new Date() })
  next()
})
const Trip = mongoose.model<ITrip>('Trip', TripSchema)
export default Trip

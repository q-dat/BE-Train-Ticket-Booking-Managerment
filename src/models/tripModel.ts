import mongoose, { Schema, Document } from 'mongoose'
import { ILocation } from './locationModel'

export interface ITrip extends Document {
  _id: mongoose.Types.ObjectId
  loai_ve_id: mongoose.Types.ObjectId
  diem_di: ILocation['_id']
  diem_den: ILocation['_id']
  ngay_khoi_hanh: Date
  ngay_den: Date
  gio_khoi_hanh: string
  gio_den: string
  createAt: Date
  updateAt: Date
}

const TripSchema: Schema = new Schema({
  loai_ve_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TicketCatalog', required: true },
  diem_di: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  diem_den: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  ngay_khoi_hanh: { type: Date, required: true },
  ngay_den: { type: Date, required: true },
  gio_khoi_hanh: { type: String, required: true },
  gio_den: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})
TripSchema.pre<ITrip>('save', function (next) {
  this.updateAt = new Date()
  next()
})
const Trip = mongoose.model<ITrip>('Trip', TripSchema)
export default Trip;
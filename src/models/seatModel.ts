import mongoose, { Schema, Document } from 'mongoose'

export enum SeatStatus {
  Inactive = 0, // Ghế không hoạt động
  Active = 1, // Ghế đang hoạt động
  Reserved = 2, // Ghế đã được đặt
  Broken = 3, // Ghế bị hỏng
  Maintenance = 4 // Ghế đang bảo trì
}
export interface ISeat extends Document {
  _id: mongoose.Types.ObjectId
  seat_catalog_id: mongoose.Types.ObjectId
  name: string
  price: string
  des?: string
  status: number
  ordinal_numbers: number
  createAt: Date
  updateAt: Date
}

const SeatSchema: Schema = new Schema({
  seat_catalog_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SeatCatalog', required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  des: { type: String },
  status: { type: Number, required: true, enum: Object.values(SeatStatus) },
  ordinal_numbers: { type: Number, require: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})

SeatSchema.pre<ISeat>('save', function (next) {
  this.updateAt = new Date()
  next()
})
SeatSchema.pre<ISeat>('updateOne', function (next) {
  this.set({ updateAt: new Date() })
  next()
})
const Seat = mongoose.model<ISeat>('Seat', SeatSchema)
export default Seat

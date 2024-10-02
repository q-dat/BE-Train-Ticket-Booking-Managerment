import mongoose, { Schema, Document } from 'mongoose'

export interface ISeat extends Document {
  _id: mongoose.Types.ObjectId
  seat_catalog_id: mongoose.Types.ObjectId
  name: string
  price: number
  des?: string
  status: string
  ordinal_numbers: number
  createAt: Date
  updateAt: Date
}

const SeatSchema: Schema = new Schema({
  seat_catalog_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SeatCatalog', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  des: { type: String },
  status: { type: String, required: true },
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

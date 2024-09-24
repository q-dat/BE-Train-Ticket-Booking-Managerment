import mongoose, { Schema, Document } from 'mongoose'

export interface ISeat extends Document {
  loai_ve_id: mongoose.Types.ObjectId
  ten: string
  gia: string
  mo_ta?: string
  createAt: Date
  updateAt: Date
}

const SeatSchema: Schema = new Schema({
  loai_ve_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TicketCatalog', required: true },
  ten: { type: String, required: true },
  gia: { type: String, required: true },
  mo_ta: { type: String },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})

SeatSchema.pre<ISeat>('save', function (next) {
  this.updateAt = new Date()
  next()
})

const Seat = mongoose.model<ISeat>('Seat', SeatSchema)
export default Seat

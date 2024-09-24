import mongoose, { Schema, Document } from 'mongoose'

export interface IChair extends Document {
  loai_ve_id: mongoose.Types.ObjectId
  ten: string
  gia: string
  mo_ta?: string
  createAt: Date
  updateAt: Date
}

const ChairSchema: Schema = new Schema({
  loai_ve_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  ten: { type: String, required: true },
  gia: { type: String, required: true },
  mo_ta: { type: String },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})

ChairSchema.pre<IChair>('save', function (next) {
  this.updateAt = new Date()
  next()
})

const Chair = mongoose.model<IChair>('Chair', ChairSchema)
export default Chair

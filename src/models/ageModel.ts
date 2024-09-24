import mongoose, { Schema, Document } from 'mongoose'

export interface IAge extends Document {
  _id: mongoose.Types.ObjectId
  loai_ve_id: mongoose.Types.ObjectId
  lua_tuoi: string
  gia: number
  mo_ta?: string
  createAt: Date
  updateAt: Date
}

const AgeSchema: Schema = new Schema({
  loai_ve_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TicketCatalog', required: true },
  lua_tuoi: {
    type: String,
    required: true
  },
  gia: {
    type: Number,
    required: true
  },
  mo_ta: { type: String },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})

AgeSchema.pre<IAge>('save', function (next) {
  this.updateAt = new Date()
  next()
})

const Age = mongoose.model<IAge>('Age', AgeSchema)
export default Age

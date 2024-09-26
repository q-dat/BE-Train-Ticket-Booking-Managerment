import mongoose, { Schema, Document } from 'mongoose'

export interface IAge extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  price: number
  des?: string
  createAt: Date
  updateAt: Date
}

const AgeSchema: Schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  des: { type: String },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})

AgeSchema.pre<IAge>('save', function (next) {
  this.updateAt = new Date()
  next()
})

const Age = mongoose.model<IAge>('Age', AgeSchema)
export default Age

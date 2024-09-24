import mongoose, { Schema, Document } from 'mongoose'

export interface ILocation extends Document {
  _id: mongoose.Types.ObjectId
  ten: string
  createAt: Date
  updateAt: Date
}

const LocationSchema: Schema = new Schema({
  ten: {
    type: String,
    unique: true,
    required: true
  },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})
LocationSchema.pre<ILocation>('save', function (next) {
  this.updateAt = new Date()
  next()
})

const Location = mongoose.model<ILocation>('Location', LocationSchema)
export default Location

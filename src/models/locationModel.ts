import mongoose, { Schema, Document } from 'mongoose'

export interface ILocation extends Document {
  _id: mongoose.Types.ObjectId;
  name: string
  createAt: Date
  updateAt: Date
}

const LocationSchema: Schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true, 
  },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})

const Location = mongoose.model<ILocation>('Location', LocationSchema)
export default Location

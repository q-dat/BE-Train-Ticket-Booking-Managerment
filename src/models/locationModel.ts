import mongoose, { Schema, Document } from 'mongoose'

export interface ILocation extends Document {
  name: string
}

const LocationSchema: Schema = new Schema(
  {
    name: {
      type: String,
      unique: true
    }
  }
)

const Location = mongoose.model<ILocation>('Location', LocationSchema)
export default Location

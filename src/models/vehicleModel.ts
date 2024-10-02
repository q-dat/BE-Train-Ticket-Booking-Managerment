import mongoose, { Schema, Document } from 'mongoose'

export interface IVehicle extends Document {
  _id: mongoose.Types.ObjectId
  trip_id: mongoose.Types.ObjectId
  name: string
  status: string
  createAt: Date
  updateAt: Date
}

const VehicleSchema: Schema = new Schema({
  trip_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SeatCatalog', required: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})

VehicleSchema.pre<IVehicle>('save', function (next) {
  this.updateAt = new Date()
  next()
})
VehicleSchema.pre<IVehicle>('updateOne', function (next) {
  this.set({ updateAt: new Date() })
  next()
})
const Vehicle = mongoose.model<IVehicle>('Vehicle', VehicleSchema)
export default Vehicle

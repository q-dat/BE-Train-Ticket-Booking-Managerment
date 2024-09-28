import mongoose, { Schema, Document } from 'mongoose'

export enum VehicleStatus {
  Inactive = 0, // Phương tiện không hoạt động
  Active = 1, // Phương tiện đang hoạt động
  Reserved = 2, // Phương tiện đã được đặt
  Broken = 3, // Phương tiện bị hỏng
  Maintenance = 4 // Phương tiện đang bảo trì
}

export interface IVehicle extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  status: number
  createAt: Date
  updateAt: Date
}

const VehicleSchema: Schema = new Schema({
  name: { type: String, required: true },
  status: { type: Number, required: true, enum: Object.values(VehicleStatus) },
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

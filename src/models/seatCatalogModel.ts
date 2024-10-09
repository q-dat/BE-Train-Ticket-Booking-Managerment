import mongoose, { Schema, Document } from 'mongoose'

export interface ISeatCatalog extends Document {
  _id: mongoose.Types.ObjectId
  vehicle_id: mongoose.Types.ObjectId
  name: string
  createAt: Date
  updateAt: Date
}
const SeatCatalogSchema = new Schema({
  vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  name: { type: String, unique: true, required: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})
SeatCatalogSchema.pre<ISeatCatalog>('save', function (next) {
  this.updateAt = new Date()
  next()
})
SeatCatalogSchema.pre<ISeatCatalog>('updateOne', function (next) {
  this.set({ updateAt: new Date() })
})
const SeatCatalog = mongoose.model<ISeatCatalog>('SeatCatalog', SeatCatalogSchema)
export default SeatCatalog

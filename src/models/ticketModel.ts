import mongoose, { Schema, Document } from 'mongoose'

export interface ITicket extends Document {
  _id: mongoose.Types.ObjectId
  vehicle_id: mongoose.Types.ObjectId
  age_id: mongoose.Types.ObjectId
  trip_id: mongoose.Types.ObjectId
  price: number
  name: string
  createAt: Date
  updateAt: Date
}
const TicketSchema: Schema = new Schema({
  vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  age_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Age', required: true },
  trip_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  price: { type: Number, required: true },
  name: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
})
TicketSchema.pre<ITicket>('save', function (next) {
  this.updateAt = new Date()
  next()
})
TicketSchema.pre<ITicket>('updateOne', function (next) {
  this.set({ updateAt: new Date() })
  next()
})
const Ticket = mongoose.model<ITicket>('Ticket',TicketSchema)
export default Ticket
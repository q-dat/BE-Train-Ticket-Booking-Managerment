import mongoose, { Schema, Document } from 'mongoose'

export interface ITicket extends Document {
  _id: mongoose.Types.ObjectId
  ticket_catalog_id:mongoose.Types.ObjectId
  vehicle_id: mongoose.Types.ObjectId
  trip_id: mongoose.Types.ObjectId
  createAt: Date
  updateAt: Date
}
const TicketSchema: Schema = new Schema({
  ticket_catalog_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TicketCatalog', required: true },
  vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  trip_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
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
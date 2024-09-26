import mongoose, { Schema, Document } from 'mongoose';

export interface ITicketCatalog extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  createAt: Date;
  updateAt: Date;
}

const TicketCatalogSchema: Schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true, 
  },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

TicketCatalogSchema.pre<ITicketCatalog>('save', function (next) {
  this.updateAt = new Date();
  next();
});

const TicketCatalog = mongoose.model<ITicketCatalog>('TicketCatalog', TicketCatalogSchema);
export default TicketCatalog;

import mongoose, { Schema, Document } from 'mongoose';

export interface ITicketCatalog extends Document {
  _id: mongoose.Types.ObjectId;
  ten: string; // Tên loại vé
  createAt: Date;
  updateAt: Date;
}

const TicketCatalogSchema: Schema = new Schema({
  ten: {
    type: String,
    unique: true,
    required: true, 
  },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

// Cập nhật `updateAt` mỗi khi tài liệu được lưu
TicketCatalogSchema.pre<ITicketCatalog>('save', function (next) {
  this.updateAt = new Date();
  next();
});

const TicketCatalog = mongoose.model<ITicketCatalog>('TicketCatalog', TicketCatalogSchema);
export default TicketCatalog;

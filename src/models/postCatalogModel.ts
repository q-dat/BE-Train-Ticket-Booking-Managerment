import mongoose, { Schema, Document } from 'mongoose';

export interface IPostCatalog extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    createAt: Date;
    updateAt: Date;
}

const PostCatalogSchema: Schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

PostCatalogSchema.pre<IPostCatalog>('save', function (next) {
    this.updateAt = new Date();
    next();
});
PostCatalogSchema.pre<IPostCatalog>('updateOne', function (next) {
    this.set({ updateAt: new Date() });
    next();
});

const PostCatalog = mongoose.model<IPostCatalog>('PostCatalog', PostCatalogSchema);
export default PostCatalog;

import mongoose, { Schema, Document } from 'mongoose'

export interface IPost extends Document {
    post_catalog_id: mongoose.Types.ObjectId,
    title: string
    content: string
    createAt: Date
    updateAt: Date
}

const PostSchema: Schema = new Schema({
    post_catalog_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PostCatalog', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
})

PostSchema.pre<IPost>('save', function (next) {
    this.updateAt = new Date()
    next()
})

const Post = mongoose.model<IPost>('Post', PostSchema)
export default Post

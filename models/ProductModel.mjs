import mongoose, { model, Schema } from "mongoose";
const schema = new Schema({
    title: {
        type: String,
        minLength: 2,
        maxLength: 100,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: 'users',
        required: true,
    },
    description: String,
    price: {
        type: Number,
        minlength: 0,
        required: true,
    },
    image: String,
    status: {
        type: String,
        enum: ['ACTIVE', 'PENDING', 'DELETED'],
        default: 'ACTIVE'
    }
}, {
    timestamps: true,
})

export default model('product', schema)
import mongoose, { Schema, model } from "mongoose";

const schema = new Schema({
    title: {
        type: String,
        minlength: 5,
        maxlength: 250,
        required: true,
        unique: true
    },
    author: {
        type: Schema.Types.ObjectId,
        index: true,
        ref: 'user',
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: 'default-blg.png'
    }
}, {
    timestamps: true
})

export default model('blog', schema)
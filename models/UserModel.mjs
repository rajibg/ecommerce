import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt'

const schema = new Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 100,
        required: true,
    },
    email: {
        type: 'String',
        unique: true,
        trim: true,
        lowercase: true,
        maxLength: 150,
        index: true,
        required: true,
    },
    password: { type: String, select: false },
    resetToken: String,
    resetTokenAt: { type: Date },
}, {
    timestamps: true,
    // toJSON: {
    //     virtuals: true,
    //     transform(doc, ret) {
    //         console.log(doc)
    //         delete ret.resetToken;
    //         delete ret.resetTokenAt;
    //         delete ret.__v;
    //         return ret;
    //     }
    // }
})



schema.method('createPassword', async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt);
})

schema.method('comparePassword', async (password, userPassword) => {
    return await bcrypt.compare(password, userPassword);
})

export const UserModel = model('user', schema)
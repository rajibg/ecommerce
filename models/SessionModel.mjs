import { model, Schema } from "mongoose";

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    accessToken: {
        type: String,
        require: true
    },
    ipAddress: String,
    expiredAt: {
        type: Date,
        require: true
    }
})

const SessionModel = model('session', schema)

export default SessionModel;
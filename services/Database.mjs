import mongoose from "mongoose"
import messages from '../constants/messages.mjs'

export default function DBConnection() {
    const MONGO_URI = process.env.MONGO_URI
    mongoose.set('strictQuery', false)
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    mongoose.connection.on('connected', () => {
        console.log(messages.mongoDbConnected)
    })
    mongoose.connection.on('error', () => {
        console.log(messages.mongoDbConnectionErr)
    })
}
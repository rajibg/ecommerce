import messages from "../constants/messages.mjs"
import SessionModel from "../models/SessionModel.mjs"
import { decodeToken, verifyToken } from '../services/TokenService.mjs'
import asyncWrapper from "./asyncWrapper.mjs"

export default asyncWrapper(async (req, res, next) => {
    const token = req.headers['authorization'] || req.cookies.token
    if (token) {
        const verfiFyToken = verifyToken(token)
        if (verfiFyToken) {
            const { exp } = decodeToken(token)
            const validTokenorNot = await SessionModel.count({ user: verfiFyToken._id, accessToken: token })
            if (validTokenorNot > 0) {
                if (Date.now() >= exp * 1000) {
                    await SessionModel.findOneAndRemove({ user: verfiFyToken._id, accessToken: token })
                    next()
                }
                return res.status(403).json({ message: messages.authorized })
            }
        }
    }
    next()
})
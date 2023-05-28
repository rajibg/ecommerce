import messages from "../constants/messages.mjs"
import SessionModel from "../models/SessionModel.mjs"
import { decodeToken, verifyToken } from '../services/TokenService.mjs'
import asyncWrapper from "./asyncWrapper.mjs"

export default asyncWrapper(async (req, res, next) => {
    const token = req.headers['authorization'] || req.cookies.token
    if (token) {
        const veriFyToken = verifyToken(token)
        if (veriFyToken) {
            const { exp } = decodeToken(token)
            const validTokenorNot = await SessionModel.count({ user: veriFyToken._id, accessToken: token })
            if (validTokenorNot > 0) {
                if (Date.now() >= exp * 1000) {
                    await SessionModel.findOneAndRemove({ user: veriFyToken._id, accessToken: token })
                    next()
                } else {
                    return res.status(403).json({ message: messages.authorized })
                }
            }
        }
    }
    next()
})
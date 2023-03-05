import messages from "../constants/messages.mjs"
import SessionModel from "../models/SessionModel.mjs"
import { verifyToken } from '../services/TokenService.mjs'
import asyncWrapper from "./asyncWrapper.mjs"

export default asyncWrapper(async (req, res, next) => {
    const token = req.headers['authorization'] || req.cookies.token
    if (token) {
        const verfiFyToken = verifyToken(token)
        if (verfiFyToken) {
            const validTokenorNot = await SessionModel.count({ user: verfiFyToken._id, accessToken: token })
            if (validTokenorNot == 0) {
                return res.status(401).json({ message: messages.unAuthorized })
            } else {
                req.user = verfiFyToken
                next()
            }
        }
    }

})
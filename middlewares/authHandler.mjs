import messages from "../constants/messages.mjs"
import SessionModel from "../models/SessionModel.mjs"
import { decodeToken, verifyToken } from '../services/TokenService.mjs'
import asyncWrapper from "./asyncWrapper.mjs"

export default asyncWrapper(async (req, res, next) => {
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')?.[1] : null

    if (token) {
        const verfiFyToken = verifyToken(token)
        if (verfiFyToken) {
            const validTokenorNot = await SessionModel.count({ user: verfiFyToken._id, accessToken: token })

            if (validTokenorNot === 0) {
                return res.status(401).json({ message: messages.unAuthorized })
            } else {
                const { exp } = decodeToken(token)
                if (Date.now() >= exp * 1000) {
                    await SessionModel.findOneAndRemove({ user: verfiFyToken._id, accessToken: token })
                    return res.status(401).json({ message: messages.unAuthorized })
                }
                req.user = verfiFyToken
                next()
            }
        } else {
            return res.status(401).json({ message: messages.unAuthorized })
        }
    } else {
        return res.status(401).json({ message: messages.unAuthorized })
    }

})
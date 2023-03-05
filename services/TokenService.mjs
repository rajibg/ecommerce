import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export const secret = process.env.TOKEN_SECRET

export const createToken = (data, expiresIn = '24h') => {
    return jwt.sign(data, secret, { expiresIn })
}

export const verifyToken = (token) => {
    return jwt.verify(token, secret);
}
export const decodeToken = (token) => {
    return jwt.decode(token);
}

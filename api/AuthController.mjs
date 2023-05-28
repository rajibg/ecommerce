import Joi from "joi"
import { UserModel } from "../models/UserModel.mjs"
import bcrypt from "bcrypt"
import messages from "../constants/messages.mjs"
import _ from 'lodash'
import { createToken } from "../services/TokenService.mjs"
import SessionModel from "../models/SessionModel.mjs"
import moment from "moment/moment.js"
import { getClientIp } from '../utils/common.mjs'
import crypto from 'crypto'
import { sendMail } from "../services/MailService.mjs"


export const registration = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required().trim(),
        email: Joi.string().email().max(150).required().case('lower').trim().external(() => {
            return checkUniqueEmail(req.body.email)
        }),
        password: Joi.string().max(100).required().trim(),
        confirmPassword: Joi.ref('password'),
    })
    const validation = await schema.validateAsync(req.body, { abortEarly: false })
    const model = new UserModel(validation)
    model.password = await model.createPassword(model.password)
    await model.save()
    res.status(201).json({ user: _.pick(model.toJSON(), ['name', 'email', '_id']) })
}

export const authCheck = async (req, res) => {
    return res.status(200).json({ user: req.user })
}
export const logout = async (req, res) => {
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')?.[1] : null
    await SessionModel.deleteOne({ user: req.user._id, accessToken: token })
    return res.status(200).json({ message: messages.logoutMsg })
}

export const login = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().max(150).required().case('lower').trim(),
        password: Joi.string().max(100).required().trim(),
    })
    const validation = await schema.validateAsync(req.body, { abortEarly: false })
    const user = await UserModel.findOne({ email: validation.email }, { name: 1, email: 1, password: 1, accessToken: 1 })
    if (!user) {
        return res.status(400).json({ email: messages.userNotFound });
    }
    const checkValidPassoword = await bcrypt.compare(validation.password, user.password)
    if (!checkValidPassoword) {
        return res.status(400).json({ error: { password: messages.passwordIncorrect } });
    }
    const userJson = _.pick(user.toJSON(), ['_id', 'name', 'email']);

    const newAccessToken = createToken(userJson)
    const clientIp = getClientIp(req)
    const session = new SessionModel({
        user: user._id,
        accessToken: newAccessToken,
        ipAddress: clientIp,
        expiredAt: moment().add(1, 'day')
    })
    await session.save({ validateBeforeSave: false })
    res.cookie('token', newAccessToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 //1 day 
    })
    return res.status(200).json({ token: newAccessToken, user: userJson })
}

export const forgotPassword = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().max(150).required().case('lower').trim(),
    })
    const validation = await schema.validateAsync(req.body, { abortEarly: false })
    const user = await UserModel.findOne({ email: validation.email }, { name: 1, email: 1 })
    if (!user) {
        return res.status(400).json({ email: messages.userNotFound });
    }
    const token = crypto.randomBytes(30).toString('hex');
    await sendMail({
        to: user.email, username: user.name, subject: 'Reset Password', 'title': '', content: `<a href="${process.env.BASE_URL}/reset-password?token=${token}">Click here to Reset Password</a>`
    })
    user.resetToken = token
    user.resetTokenAt = moment().add(1, 'hour')
    await user.save({ validateBeforeSave: false })
    return res.status(200).json({ message: messages.resetPasswordSent })
}

export const resetPassword = async (req, res) => {
    const resetToken = req.body.resetToken || ''
    if (_.isEmpty(resetToken)) {
        return res.status(400).json({ message: messages.resetTokenNotFound })
    }
    const schema = Joi.object({
        password: Joi.string().min(6).max(40).required().trim(),
        confirmPassword: Joi.ref('password')
    })
    const validationData = await schema.validateAsync(_.pick(req.body, ['password', 'confirmPassword']), { abortEarly: false })
    const user = await UserModel.findOne({ resetToken, resetTokenAt: { $gte: new Date() } }, { name: 1, email: 1 })
    if (!user) {
        return res.status(400).json({ email: messages.resetTokenexpired });
    }
    user.password = await user.createPassword(validationData.password)
    user.resetToken = undefined;
    user.resetTokenAt = undefined
    await user.save({ validateBeforeSave: false })
    return res.status(200).json({ message: messages.passwordChanges })
}


const checkUniqueEmail = async (email, id = null) => {
    const query = { email: email.toLowerCase() }
    if (id) {
        query._id = { $ne: id }
    }
    const checkHasEmail = await UserModel.count(query)

    if (checkHasEmail > 0) {
        throw new Joi.ValidationError("string.email", [
            {
                message: messages.emailAlreadyUsed,
                path: ["email"],
                type: "string.email",
                context: {
                    key: "email",
                    label: "email",
                    email,
                },
            },
        ],
            email)

        // throw new Error(JSON.stringify({
        //     email: messages.emailAlreadyUsed
        // }));
    }
}

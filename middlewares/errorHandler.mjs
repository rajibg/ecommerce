import _ from "lodash";
import messages from "../constants/messages.mjs";
import { logger } from "../services/logging.mjs";

export default function ErrorHandler(err, req, res) {
    let statusCode = 500;
    let message = messages.serverError
    let errors = new Object;
    let name = err.name
    let errorStack = err.stack
    if (process.env.NODE_ENV !== 'development') {
        console.log(err)
    }

    switch (name) {
        case 'TypeError':
        case 'ValidationError':
            statusCode = 400;
            message = err.message
            if (err.details) {
                for (let _err of err.details) {
                    errors[_err.context.key] = _err.message.replace(/['"]+/g, "");
                }
            }
            break;
        case 'JsonWebTokenError':
            statusCode = 400;
            message = messages.tokenError
            break;
        case 'MongoServerError':
            statusCode = 400;
            if (err.code === 11000) {
                const keyValue = Object.keys(err.keyValue)
                errors[keyValue[0]] = `${keyValue[0]} is already exist.`;
            }

            break;
        default:
            statusCode = 500;
    }
    return res.status(statusCode).json({ error: !_.isEmpty(errors) ? errors : message });
}
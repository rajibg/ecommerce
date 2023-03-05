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
    if (name === 'TypeError' || name === 'ValidationError') {
        statusCode = 400;
        message = err.message
    }
    if (name === 'ValidationError' && err.details) {
        for (let _err of err.details) {
            errors[_err.context.key] = _err.message.replace(/['"]+/g, "");
        }
    }

    return res.status(statusCode).json({ error: !_.isEmpty(errors) ? errors : message });
}
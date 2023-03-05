import winston from "winston";

const { transports, createLogger, format } = winston;

export const logger = winston.createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new winston.transports.File({ filename: './log/error.log' }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: './log/uncaughtException.log' })
    ],
    exitOnError: false
});

export default function () {
    if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple(),
        }));
    }

    process.on('uncaughtException', (err) => {
        throw new Error(err)
    });
    process.on('unhandledRejection', (err) => {
        throw new Error(err)
    });

}

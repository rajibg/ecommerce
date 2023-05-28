import cookieParser from "cookie-parser";
import express from "express";
import cors from 'cors'
import Emitter from 'events'
import dotenv from 'dotenv'
import DBConnection from "./services/Database.mjs";
import router from './routes/index.mjs'
import ErrorHandler from "./middlewares/errorHandler.mjs";
import logging from "./services/logging.mjs";
import morgan from "morgan";
import formData from "express-form-data";
import os from 'os'
const app = express()
const eventEmitter = new Emitter();
dotenv.config()
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('tiny'))
const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};
app.use(formData.parse(options))
app.use(formData.union())
logging()
DBConnection()
router(app);
app.use((err, req, res, next) => {
    ErrorHandler(err, req, res)
});
eventEmitter.once('event', (address) => {
    console.log(`Your port listing on http://${address.address === '::' ? '127.0.0.1' : address.address}${address.port ? ':' + address.port : ''}`)
})
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    eventEmitter.emit('event', server.address())
})


import express from "express";
import { forgotPassword, login, registration, resetPassword } from "../api/AuthController.mjs";
import guestHandler from "../middlewares/guestHandler.mjs";
import asyncWrapper from "../middlewares/asyncWrapper.mjs";
const router = express.Router()

router.post('/login', guestHandler, asyncWrapper(login))
router.post('/registration', guestHandler, asyncWrapper(registration))
router.post('/forget-password', asyncWrapper(forgotPassword))
router.post('/reset-password', asyncWrapper(resetPassword))

export default router;
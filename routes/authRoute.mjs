import express from "express";
import { authCheck, forgotPassword, login, logout, registration, resetPassword } from "../api/AuthController.mjs";
import guestHandler from "../middlewares/guestHandler.mjs";
import asyncWrapper from "../middlewares/asyncWrapper.mjs";
import authHandler from "../middlewares/authHandler.mjs";
const router = express.Router()

router.post('/login', guestHandler, asyncWrapper(login))
router.post('/auth-check', authHandler, asyncWrapper(authCheck))
router.post('/logout', authHandler, asyncWrapper(logout))
router.post('/registration', guestHandler, asyncWrapper(registration))
router.post('/forget-password', asyncWrapper(forgotPassword))
router.post('/reset-password', asyncWrapper(resetPassword))

export default router;
import express from "express";
import authHandler from "../middlewares/authHandler.mjs";
import asyncWrapper from "../middlewares/asyncWrapper.mjs";
import { createProduct } from "../api/ProductController.mjs";
const router = express.Router()

router.post('/create', asyncWrapper(createProduct))

export default router;
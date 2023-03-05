import express from "express";
import asyncWrapper from "../middlewares/asyncWrapper.mjs";
import { createProduct } from "../api/ProductController.mjs";
const router = express.Router()

router.post('/create', asyncWrapper(createProduct))

export default router;
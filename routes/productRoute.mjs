import express from "express";
import asyncWrapper from "../middlewares/asyncWrapper.mjs";
import { createOrUpdateProduct } from "../api/ProductController.mjs";
const router = express.Router()

router.post('/create', asyncWrapper(createOrUpdateProduct))
router.put('/update/:id', asyncWrapper(createOrUpdateProduct))

export default router;
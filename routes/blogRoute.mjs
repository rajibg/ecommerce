import express from "express";
import { createOrUpdateBlog, destroy } from "../api/BlogController.mjs";
import asyncWrapper from "../middlewares/asyncWrapper.mjs";

const router = express.Router()

router.post('/create', asyncWrapper(createOrUpdateBlog))
router.post('/update/:id', asyncWrapper(createOrUpdateBlog))
router.post('/delete/:id', asyncWrapper(destroy))

export default router;
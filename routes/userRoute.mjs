import express from "express";
const router = express.Router()

router.get('/', async function (req, res, next) {
    res.status(200).json({ test: 'test', })
})

export default router;
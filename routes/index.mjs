import productRoute from './productRoute.mjs'
import authRoute from './authRoute.mjs'
import blogRoute from './blogRoute.mjs'
import authHandler from "../middlewares/authHandler.mjs";
import asyncWrapper from '../middlewares/asyncWrapper.mjs';
import { getList } from '../api/BlogController.mjs';


export default function (app) {
    app.use('/api/auth', authRoute)
    app.use('/api/products', authHandler, productRoute)
    app.get('/api/blogs/list', asyncWrapper(getList))
    app.use('/api/blogs', authHandler, blogRoute)
    app.use('*', async function (req, res) {
        console.log(req)
        return res.status(200).json({ data: req.path })
    })

}


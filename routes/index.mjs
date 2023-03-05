import productRoute from './productRoute.mjs'
import authRoute from './authRoute.mjs'
import authHandler from "../middlewares/authHandler.mjs";


export default function (app) {
    app.use('/api/auth', authRoute)
    app.use('/api/products', authHandler, productRoute)
    app.use('*', async function (req, res) {
        return res.status(200).json({ data: req.path })
    })

}


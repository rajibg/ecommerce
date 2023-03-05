import Joi from "joi"
import ProductModel from '../models/ProductModel.mjs'

export const createProduct = async (req, res) => {
    const Schema = Joi.object({
        title: Joi.string().min(2).max(100).required().trim(),
        description: Joi.string().max(1000).required(),
        price: Joi.number().required().positive(),
    })

    const validate = await Schema.validateAsync(req.body, { abortEarly: false })
    const product = new ProductModel(validate)
    product.author = req.user._id
    await product.save();
    res.status(201).json({ product })
}
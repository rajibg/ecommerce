import Joi from "joi"
import ProductModel from '../models/ProductModel.mjs'
import { fileUpload } from "../utils/common.mjs";

export const createOrUpdateProduct = async (req, res) => {
    const Schema = Joi.object({
        title: Joi.string().min(2).max(100).required().trim(),
        description: Joi.string().max(1000).required(),
        price: Joi.number().required().positive(),
        image: Joi.any().external(() => {
            if (req.image) {
                if (req.image.size <= 0) {
                    throw new Error('Please upload valid picture.');
                } else if (req.image.type.split('/')[0] !== 'image') {
                    throw new Error('Please upload a image file.');
                }
            }
        })
    })
    const validate = await Schema.validateAsync(req.body, { abortEarly: false })
    const productId = req.params.id || null
    if (validate.image) {
        validate.image = await fileUpload(validate.image, 'uploads/products')
    }
    let product = ''
    if (productId) {
        product = await ProductModel.findByIdAndUpdate(productId, { $set: validate }, { new: true, upsert: true })
    } else {
        product = new ProductModel(validate)
        product.author = req.user._id
        await product.save();
    }
    res.status(201).json({ product })
}

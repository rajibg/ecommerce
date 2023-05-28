import Joi from "joi";
import BlogModel from "../models/BlogModel.mjs";
import _ from "lodash";

const MAX_LIMIT = 100;


export const getList = async (req, res) => {
    const limit = req.body.limit || MAX_LIMIT;
    const page = req.body.offset || 1;
    const offset = (page - 1) * limit;

    const models = await BlogModel.find({}, '-__v -updatedAt').skip(offset).limit(limit).populate('author', 'name')
    const totalBlogs = await BlogModel.countDocuments();
    res.status(200).json({ data: models, page, total: totalBlogs })
}

export const createOrUpdateBlog = async (req, res) => {
    const Schema = Joi.object({
        title: Joi.string().min(5).max(150).required().trim(),
        description: Joi.string().required(),
        image: Joi.any().external(() => {
            let errMsg = null;
            if (req.image) {
                if (req.image.size <= 0) {
                    errMsg = 'Please upload valid picture.';
                } else if (req.image.type.split('/')[0] !== 'image') {
                    errMsg = 'Please upload a image file.';
                }
            }
            if (errMsg) {
                throw new Joi.ValidationError("string.image", [
                    {
                        message: errMsg,
                        path: ["image"],
                        type: "string.image",
                        context: {
                            key: "image",
                            label: "image",
                            email,
                        },
                    },
                ], image)
            }

        })
    })
    const validate = await Schema.validateAsync(req.body, { abortEarly: false })
    const blogId = req.params.id || null
    if (validate.image) {
        validate.image = await fileUpload(validate.image, 'uploads/blogs')
    }
    let blog = null
    if (blogId) {
        blog = await BlogModel.findByIdAndUpdate(blogId, { $set: validate }, { new: true, upsert: true })
    } else {
        blog = new BlogModel(validate)
        blog.author = req.user._id
        await blog.save();
    }
    res.status(201).json({ data: _.omit(blog, ['author', '_v']) })
}

export const destroy = async (req, res) => {
    const blogId = req.params.id
    const model = await BlogModel.findByIdAndDelete(blogId)
    console.log(model)
    res.status(200).json({ message: 'Blog deleted successfully.' })
}
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
    const blog = new Blog(req.body)

    // error 400 if title or url are not present
    if (!blog.title || !blog.url) {
        return res.status(400).json({ error: 'title or url missing' })
    }

    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
})

module.exports = blogsRouter
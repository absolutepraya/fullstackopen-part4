const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// get all blogs
blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

// add a new blog
blogsRouter.post('/', async (req, res) => {
    const blog = new Blog(req.body)

    // error 400 if title or url are not present
    if (!blog.title || !blog.url) {
        return res.status(400).json({ error: 'title or url missing' })
    }

    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
})

// delete a blog
blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

// update a blog
blogsRouter.put('/:id', async (req, res) => {
    // if nothing is passed in the request body, return 400
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'nothing to update' })
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedBlog)
})

module.exports = blogsRouter
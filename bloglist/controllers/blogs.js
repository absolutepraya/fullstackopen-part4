const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// get all blogs
blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

// add a new blog
blogsRouter.post('/', async (req, res) => {
    const body = req.body

    const user = await User.findById(body.userId)

    const blog = new Blog({
        title: body.title,
        author: user.id,
        url: body.url,
        likes: body.likes
    })

    // error 400 if title or url are not present
    if (!blog.title || !blog.url) {
        return res.status(400).json({ error: 'title or url missing' })
    }

    const savedBlog = await blog.save()

    // add the blog to the user's blogs array
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

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
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

// before each test, clear the database and re-add the initial blogs
beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('(cleared)')

    await Blog.insertMany(helper.blogs)
    console.log('(added 6 blogs)')
})

describe('api GET test', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are 6 blogs', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, 6)
    })

    test('the first blog is about React patterns', async () => {
        const response = await api.get('/api/blogs')

        const titles = response.body.map(e => e.title)
        assert(titles.includes('React patterns'))
    })

    test('id is defined', async () => {
        const response = await api.get('/api/blogs')
        
        // check all blogs have id and not _id
        response.body.forEach(blog => {
            assert(blog.id)
            assert(!blog._id)
        })
    })
})

describe('api POST test', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'Star Wars',
            author: 'George Lucas',
            url: 'https://starwars.com',
            likes: 100
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        // check if the new blog is added
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.blogs.length + 1)

        // check if the new blog is in the list
        const titles = blogsAtEnd.map(e => e.title)
        assert(titles.includes('Star Wars'))
    })

    test('if likes is missing, it defaults to 0', async () => {
        const newBlog = {
            title: 'Star Wars',
            author: 'George Lucas',
            url: 'https://starwars.com'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        const addedBlog = blogsAtEnd.find(blog => blog.title === 'Star Wars')
        assert.strictEqual(addedBlog.likes, 0)
    })

    test('blog without title/url is not added', async () => {
        // check if title is missing
        let newBlog = {
            title: '',
            author: 'Someone',
            url: 'https://example.com',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.blogs.length)

        // check if url is missing
        newBlog.title = 'Title'
        newBlog.url = ''

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        
        const blogsAtEnd2 = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd2.length, helper.blogs.length)
    })
})

describe('api DELETE test' , () => {
    test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.blogs.length - 1)

        const titles = blogsAtEnd.map(e => e.title)
        assert(!titles.includes(blogToDelete.title))
    })
})

describe('api PUT test', () => {
    test('a blog can be updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const updatedBlog = {
            title: 'Updated Title',
            author: 'Updated Author',
            url: 'https://updated.com',
            likes: 999
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        const updated = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
        assert.deepStrictEqual(updated, { ...blogToUpdate, ...updatedBlog })
    })

    test('if nothing is updated, return 400', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({})
            .expect(400)
    })
})

after(async () => {
    await mongoose.connection.close()
})
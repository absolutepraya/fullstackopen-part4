const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('dummy test', () => {
    test('dummy returns one', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        assert.strictEqual(result, 1)
    })
})

// import dummy blogs
const { oneBlog, blogs } = require('./test_blogs')

describe('total likes', () => {

    test('sum of likes from one blog', () => {
        const result = listHelper.totalLikes(oneBlog)
        assert.strictEqual(result, 5)
    })

    test('sum of likes from multiple blogs', () => {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 36)
    })
})

describe('favorite blog', () => {
    test('favorite blog from one blog', () => {
        const result = listHelper.favoriteBlog(oneBlog)
        assert.deepStrictEqual(result, oneBlog[0])
    })

    test('favorite blog from multiple blogs', () => {
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, blogs[2])
    })
})

describe('most blogs', () => {
    test('author with most blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
    })
})

describe('most likes', () => {
    test('author with most likes', () => {
        const result = listHelper.mostLikes(blogs)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
    })
})
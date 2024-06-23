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

describe('total likes', () => {
    const oneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]

    const blogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Introduction to Algorithms',
            author: 'Thomas H. Cormen',
            url: 'https://mitpress.mit.edu/books/introduction-algorithms-third-edition',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422b891b54a676234d17fa',
            title: 'The Art of Computer Programming',
            author: 'Donald E. Knuth',
            url: 'http://www-cs-faculty.stanford.edu/~knuth/taocp.html',
            likes: 12,
            __v: 0
        },
        {
            _id: '5a422ba71b54a676234d17fb',
            title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
            author: 'Robert C. Martin',
            url: 'https://www.pearson.com/us/higher-education/program/Martin-Clean-Code-A-Handbook-of-Agile-Software-Craftsmanship/PGM319733.html',
            likes: 8,
            __v: 0
        },
        {
            _id: '5a422bc61b54a676234d17fc',
            title: 'You Don’t Know JS',
            author: 'Kyle Simpson',
            url: 'https://github.com/getify/You-Dont-Know-JS',
            likes: 15,
            __v: 0
        }
    ]

    test('sum of likes from one blog', () => {
        const result = listHelper.totalLikes(oneBlog)
        assert.strictEqual(result, 5)
    })

    test('sum of likes from multiple blogs', () => {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 50)
    })
})
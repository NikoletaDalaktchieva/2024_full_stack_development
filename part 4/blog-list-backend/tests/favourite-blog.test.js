const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')




const listWithOneBlog = [{
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  likes: 5,
  __v: 0
}]

const listWithManyBlogs = [{
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  likes: 5,
  __v: 0
},
{
  _id: '6a422aa11b54a676234d18f8',
  title: 'yes no',
  author: 'Random name',
  url: 'https://dog-lovers.com',
  likes: 2,
  __v: 0
},
{
  _id: '1c522aa21b54a676234d18f8',
  title: 'tstststs',
  author: 'bababa',
  url: 'https://alabala.com',
  likes: 8,
  __v: 0
}]


describe('favourite blog', () => {

  test('favourite of none', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result,null)
  })

  test('favourite of one', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result,listWithOneBlog[0])
  })

  test('favourite of many', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    assert.deepStrictEqual(result, {
      _id: '1c522aa21b54a676234d18f8',
      title: 'tstststs',
      author: 'bababa',
      url: 'https://alabala.com',
      likes: 8,
      __v: 0
    })
  })
})
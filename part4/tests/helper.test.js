const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const blogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
          }
      ]

      test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(5)
      })

     
})

describe('most likes', () => {
    const blogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
          }
      ]

      test('fav blog', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual( {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
          })
      })
})
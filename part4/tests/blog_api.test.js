const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

// beforeAll(async () => {
//     await User.deleteMany({})
//     const promiseArray = helper.initialUsers.map(user => {
//        return api.post('/api/users')
//         .send(user)
//     })
//     await Promise.all(promiseArray)
// })

// beforeEach(async () => {
//     const {username, password} = helper.initialUsers
//     await Blog.deleteMany({})
//     const user = await api
//     .post('/api/login')
//     .send({ username, password })


// })
let token
test('login works', async () => {
    const {username, password} = helper.initialUsers[1]
    await Blog.deleteMany({})
    const response = await api
    .post('/api/login')
    .send({ username, password })
    .expect(200)
    .expect('Content-Type', /application\/json/)

    token = response.body.token
    token = "Bearer "+token
    console.log(token, "token")
    await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(helper.initialBlogs[0])
    .expect(201)
    .expect('Content-Type', /application\/json/)
}, 10000)

test('blogs returned as json', async () => {
   const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(1)
}, 10000)

test('blog has id property', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
})

test('blog can be added', async () => {
    const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)

    const blogs = response.body.map(b => b.title)
    expect(blogs).toContain(newBlog.title)

})

test('blog is saved with no likes', async () => {
    const newBlog = {
        title: "Meep wars",
        author: "Bob Mart",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
    }

    await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(201)

    const response = await api.get('/api/blogs')
    const blog = response.body.find(b => b.title === newBlog.title)
    expect(blog.likes).toBe(0)
})

test("do not add without url or title", async () => {
    const urlBlog = {
        title: "Missing your url",
        author: "Bob Mart",
    }

    const titleBlog = {
        author: "Bob Mart",
        url: "Title is gone"
    }

    await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(urlBlog)
        .expect(400)

    const content = await api.get('/api/blogs')
    expect(content.body).toHaveLength(3)
})

test('delete blog', async () => {
    const blogsToStart = await helper.blogsInDb()
    const blogToDelete = blogsToStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', token)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsToStart.length -1)

    const content = blogsAtEnd.map(blog => blog.id)
    expect(content).not.toContain(blogToDelete.id)
})
test('update blog', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    let blogToUpdate = blogsAtStart.body[0]
    const updatedBlog = {
        likes: blogToUpdate.likes + 100
    }
    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)

    const updatedBlogAtEnd = await api.get(`/api/blogs/${blogToUpdate.id}`)
    console.log(updatedBlogAtEnd.body)
    expect(updatedBlogAtEnd.body).toBeDefined
    expect(updatedBlogAtEnd.body.likes).toBe(blogToUpdate.likes + 100)
})

afterAll(async () => {
    await mongoose.connection.close()
})
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogRouter.get('/', (req, res) => {
    Blog
    .find({})
    .populate('user', {username:1, name:1})
    .then(blogs => {
        // console.log(blogs[0], 'blog')
        // console.log(blogs[0].id, 'blog id')
        // console.log(typeof blogs[0].id)
        res.json(blogs)
    } )
})

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.startsWith('Bearer ')){
//         return authorization.replace('Bearer ', '')
//     }
//     return null
// }

blogRouter.post('/',middleware.tokenExtractor ,async (req, res, next) => {
    const body = req.body

    if (!body.url || !body.title) {
        return res.status(400).json({error: "title or url missing"})
   }

   const decodedToken = jwt.verify(req.token, process.env.SECRET)
   if (!decodedToken.id) {
    return res.status(401).json({error: "token invalid"})
   }
   const user = req.user
//    console.log(user)
//    console.log(user.id, user._id, "two user ids")
   
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    const savedBlog = await blog.save()
    // console.log(savedBlog, " 'saved blog' ")
    // console.log(savedBlog.id, savedBlog._id, "two ids")
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    res.status(201).json(savedBlog)
})

blogRouter.delete('/:id',middleware.tokenExtractor , async (req, res, next) => {
  //const decodedToken = jwt.verify(req.token, process.env.SECRET)
  const blogToDelete = await Blog.findById(req.params.id)
  console.log(blogToDelete, '"blogToDelete')
  if (blogToDelete.user.toString() === req.user.id) {
    await Blog.findByIdAndDelete(req.params.id)
  }
  else {
    return res.status(401).json({error: 'invalid token will not remove blog'})
  }
  res.status(204).end()
})

blogRouter.put('/:id', async (req, res, next) => {
    const body = req.body
    const updatedBlog =
     await Blog.findByIdAndUpdate(req.params.id, body, {new: true})
     res.json(updatedBlog)
})

blogRouter.get('/:id', async (req, res, next) => {
    const blog = await Blog.findById(req.params.id)
    res.json(blog)
})

module.exports = blogRouter
const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.post('/:id', async (req, res) => {
    const blogToComment = await Blog.findById(req.params.id)
    const body = req.body

    const comment = new Comment({
        content: body.content,
        blog: blogToComment._id
    })

    const savedComment = await comment.save()

    blogToComment.comments = blogToComment.comments.concat(savedComment.id)
    await blogToComment.save()
    res.status(201).json(savedComment)
})

module.exports = commentsRouter
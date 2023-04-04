const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')


// const passwordHash = await bcrypt.hash('sekret', 10)
//         const user = new User({ ...helper.initialUsers[0], passwordHash})
//         await user.save()

describe('when there is one user in db', () => {
    beforeEach(async () => {
       await User.deleteMany({})
       const promiseArray = helper.initialUsers.map(u => {
        return bcrypt.hash('sekret', 10)
        .then(passwordHash => {
            let user = new User({ ...u, passwordHash})
            return user.save()
        })
       })
       await Promise.all(promiseArray)
    })

    test('db has 1 users', async () => {
        const users = await api.get('/api/users')
        expect(users.body).toHaveLength(2)
    })

    test('rejects invalid password', async () => {
        let user = {
            username:"meep",
        }

        await api
        .post('/api/users')
        .send(user)
        .expect(400)

        user = {
            username:"meep",
            password:"lo"
        }

        await api
        .post('/api/users')
        .send(user)
        .expect(400)

        user = {
            username:"me",
            password:"loop"
        }

        await api
        .post('/api/users')
        .send(user)
        .expect(400)


        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    })
})
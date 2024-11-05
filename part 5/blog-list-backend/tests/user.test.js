const bcrypt = require('bcrypt')
const User = require('../models/user')
const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert/strict')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })


  test('fails with status code 400 if username is less than 3 symbols', async () => {
    const newUser = {
      usernname: 'A',
      name: 'Test name',
      password: 'testpass',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('fails with status code 400 if password is less than 3 symbols', async () => {
    const newUser = {
      usernname: 'A',
      name: 'Test name',
      password: 'testpass',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})


after(async () => {
  await mongoose.connection.close()
})
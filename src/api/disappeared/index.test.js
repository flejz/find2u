import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Disappeared } from '.'

const app = () => express(routes)

let userSession, anotherSession, disappeared

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  disappeared = await Disappeared.create({ user })
})

test('POST /disappeareds 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ token: userSession, name: 'test', birth_date: 'test', date: 'test', obs: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.birth_date).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.obs).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /disappeareds 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /disappeareds 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /disappeareds/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${disappeared.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(disappeared.id)
})

test('GET /disappeareds/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /disappeareds/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${disappeared.id}`)
    .send({ token: userSession, name: 'test', birth_date: 'test', date: 'test', obs: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(disappeared.id)
  expect(body.name).toEqual('test')
  expect(body.birth_date).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.obs).toEqual('test')
  expect(body.status).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /disappeareds/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`/${disappeared.id}`)
    .send({ token: anotherSession, name: 'test', birth_date: 'test', date: 'test', obs: 'test', status: 'test' })
  expect(status).toBe(401)
})

test('PUT /disappeareds/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${disappeared.id}`)
  expect(status).toBe(401)
})

test('PUT /disappeareds/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ token: anotherSession, name: 'test', birth_date: 'test', date: 'test', obs: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /disappeareds/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${disappeared.id}`)
    .query({ token: userSession })
  expect(status).toBe(204)
})

test('DELETE /disappeareds/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`/${disappeared.id}`)
    .send({ token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /disappeareds/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${disappeared.id}`)
  expect(status).toBe(401)
})

test('DELETE /disappeareds/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ token: anotherSession })
  expect(status).toBe(404)
})

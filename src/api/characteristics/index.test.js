import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Characteristics } from '.'

const app = () => express(routes)

let userSession, anotherSession, characteristics

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  characteristics = await Characteristics.create({ user })
})

test('POST /characteristics 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, reference_id: 'test', type: 'test', which: 'test', description: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.reference_id).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.which).toEqual('test')
  expect(body.description).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /characteristics 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /characteristics 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('DELETE /characteristics/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${characteristics.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /characteristics/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`/${characteristics.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /characteristics/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${characteristics.id}`)
  expect(status).toBe(401)
})

test('DELETE /characteristics/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})

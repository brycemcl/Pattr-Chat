const request = require('supertest')
const app = require('../app')
// https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  })
})

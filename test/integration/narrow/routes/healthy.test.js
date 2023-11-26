const { createServer } = require('../../../../app/server')

let server

beforeEach(async () => {
  server = await createServer()
  await server.start()
})

afterEach(async () => {
  await server.stop()
})

describe('Healthy test', () => {
  test('GET /healthy route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/auth/healthy'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })
})

import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

let token: string

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()

    token = await createAndAuthenticateUser()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be albe to search gym', async () => {
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym TypeScript',
        description: 'Academia de TypeScript',
        phone: '',
        latitude: 0,
        longitude: 0,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym JavaScript',
        description: 'Academia de JavaScript',
        phone: '',
        latitude: 0,
        longitude: 0,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'JavaScript',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Gym JavaScript',
      }),
    ])
  })
})

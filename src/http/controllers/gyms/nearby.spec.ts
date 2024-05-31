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

  it('shoud be albe to nearby gym', async () => {
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym TypeScript',
        description: 'Academia de TypeScript',
        phone: '',
        latitude: -3.6867,
        longitude: -40.3481,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym JavaScript',
        description: 'Academia de JavaScript',
        phone: '',
        latitude: -3.7217366,
        longitude: -40.4596609,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -3.6867,
        longitude: -40.3481,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})

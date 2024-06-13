import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

let token: string

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()

    token = await createAndAuthenticateUser(app, true)
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be albe to create gym', async () => {
    const createGymResponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym Javascript',
        description: 'Academia de Javascript',
        phone: '',
        latitude: 0,
        longitude: 0,
      })

    expect(createGymResponse.statusCode).toEqual(201)
  })
})

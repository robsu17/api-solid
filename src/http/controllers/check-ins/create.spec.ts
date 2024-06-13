import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

let token: string

describe('Create Check In (e2e)', () => {
  beforeAll(async () => {
    await app.ready()

    token = await createAndAuthenticateUser(app)
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to create check-in', async () => {
    const gym = await prisma.gym.create({
      data: {
        title: 'Javascript Gym',
        latitude: -3.6867,
        longitude: -40.3481,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -3.6867,
        longitude: -40.3481,
      })

    expect(response.statusCode).toEqual(201)
  })
})

import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

let token: string

describe('Metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()

    token = await createAndAuthenticateUser(app, true)
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to validate check in', async () => {
    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Javascript Gym',
        latitude: -3.6867,
        longitude: -40.3481,
      },
    })

    const checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)
  })
})

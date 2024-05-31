import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

let token: string

describe('History Check-Ins (e2e)', () => {
  beforeAll(async () => {
    await app.ready()

    token = await createAndAuthenticateUser()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to list the history of check-ins', async () => {
    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Javascript Gym',
        latitude: -3.6867,
        longitude: -40.3481,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(201)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
      }),
      expect.objectContaining({
        gym_id: gym.id,
      }),
    ])
  })
})

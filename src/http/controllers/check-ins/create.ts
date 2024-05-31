import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)

  const { sub } = request.user

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const checkInUseCase = makeCheckInUseCase()

  const { checkin } = await checkInUseCase.execute({
    gymId,
    userId: sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  reply.status(201).send({
    checkin,
  })
}
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'
import { makeFetchUserCheckInHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-in-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = createCheckInParamsSchema.parse(request.query)

  const { sub } = request.user

  const checkInUseCase = makeFetchUserCheckInHistoryUseCase()

  const { checkIns } = await checkInUseCase.execute({
    page,
    userId: sub,
  })

  reply.status(201).send({
    checkIns,
  })
}

import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'
import { makeSearchGymUseCase } from '@/use-cases/factories/make-search-gym-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymsQuerySchema.parse(request.query)

  const searchGymsUseCase = makeSearchGymUseCase()

  const { gyms } = await searchGymsUseCase.execute({
    query,
    page,
  })

  reply.status(200).send({
    gyms,
  })
}

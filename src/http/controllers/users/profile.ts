import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getProfileUseCase = makeGetUserProfileUseCase()

  const { user } = await getProfileUseCase.execute({
    userId: request.user.sub,
  })

  reply.status(200).send({
    ...user,
    password_hash: undefined,
  })
}

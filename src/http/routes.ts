import { register } from './controller/register-contoller'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.post('/user/create', register)
}

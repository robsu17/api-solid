import { authenticate } from './controller/authenticate-controller'
import { register } from './controller/register-contoller'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
}

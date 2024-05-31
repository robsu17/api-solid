import { authenticate } from './controllers/authenticate-controller'
import { profile } from './controllers/profile'
import { register } from './controllers/register-contoller'
import { FastifyInstance } from 'fastify'
import { verifyJWT } from './middleware/veryfy-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}

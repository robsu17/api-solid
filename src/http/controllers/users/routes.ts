import { authenticate } from './authenticate'
import { profile } from './profile'
import { register } from './register'
import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middleware/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}

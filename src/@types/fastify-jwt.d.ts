import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string
      iat: Date
      role: 'ADMIN' | 'MEMBER'
    }
  }
}

import { RegisterUseCase } from '../register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeRegisterUseCase() {
  const usersRespository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRespository)
  return registerUseCase
}

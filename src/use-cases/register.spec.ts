import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'

describe('Register UseCase', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'john doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const data = {
      name: 'john doe',
      email: 'johndoe@example.com',
      password: '123456',
    }

    const { user } = await registerUseCase.execute(data)

    const isPasswordHashed = await compare(data.password, user.password_hash)

    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'johndoe@example.com'

    await registerUseCase.execute({
      name: 'john doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'john doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})

import { expect, describe, it, beforeEach } from 'vitest'
import { ICheckInsRepository } from '@/repositories/check-in-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInsRepository: ICheckInsRepository
let sut: CheckInUseCase

describe('Check-In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
  })

  it('should be able to create check in', async () => {
    const { checkin } = await sut.execute({
      gymId: 'gym-01',
      userId: 'userId-01',
    })

    expect(checkin.id).toEqual(expect.any(String))
  })
})

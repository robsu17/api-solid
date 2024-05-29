import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { ICheckInsRepository } from '@/repositories/check-in-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { IGymsRepository } from '@/repositories/gyms-repositorty'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: ICheckInsRepository
let gymsRepository: IGymsRepository
let sut: CheckInUseCase

describe('Check-In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.create({
      id: 'gym-01',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-3.6867),
      longitude: new Decimal(-40.3481),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to create check in', async () => {
    const { checkin } = await sut.execute({
      gymId: 'gym-01',
      userId: 'userId-01',
      userLatitude: -3.6867,
      userLongitude: -40.3481,
    })

    expect(checkin.id).toEqual(expect.any(String))
  })

  it('should not be able to create check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 17, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'userId-01',
      userLatitude: -3.6866326,
      userLongitude: -40.3481814,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'userId-01',
        userLatitude: -3.6866326,
        userLongitude: -40.3481814,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to create check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 17, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'userId-01',
      userLatitude: -3.6866326,
      userLongitude: -40.3481814,
    })

    vi.setSystemTime(new Date(2022, 0, 18, 8, 0, 0))

    const { checkin } = await sut.execute({
      gymId: 'gym-01',
      userId: 'userId-01',
      userLatitude: -3.6866326,
      userLongitude: -40.3481814,
    })

    expect(checkin.id).toEqual(expect.any(String))
  })

  it('should be able to create check in on distant gym', async () => {
    gymsRepository.create({
      id: 'gym-01',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-3.675201),
      longitude: new Decimal(-40.3436797),
    })

    await expect(
      sut.execute({
        gymId: 'gym-01',
        userId: 'userId-01',
        userLatitude: -3.6866326,
        userLongitude: -40.3481814,
      }),
    )
  })
})

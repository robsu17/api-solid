import { expect, describe, it, beforeEach } from 'vitest'
import { IGymsRepository } from '@/repositories/gyms-repositorty'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGyms } from './fetch-nearby-gyms'

let gymsRepository: IGymsRepository
let sut: FetchNearbyGyms

describe('Fetch Nearby Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGyms(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -3.6867,
      longitude: -40.3481,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: '',
      phone: '',
      latitude: -3.7217366,
      longitude: -40.4596609,
    })

    const { gym } = await sut.execute({
      userLatitude: -3.6867,
      userLongitude: -40.3481,
    })

    expect(gym).toHaveLength(1)
    expect(gym).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })
})

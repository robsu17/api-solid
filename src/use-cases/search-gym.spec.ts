import { expect, describe, it, beforeEach } from 'vitest'
import { IGymsRepository } from '@/repositories/gyms-repositorty'
import { SearchGymUseCase } from './search-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: IGymsRepository
let sut: SearchGymUseCase

describe('Fetch User Check Ins History Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -3.6866326,
      longitude: -40.3481814,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: '',
      phone: '',
      latitude: -3.6866326,
      longitude: -40.3481814,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `TypeScript Gym ${i}`,
        description: '',
        phone: '',
        latitude: -3.6866326,
        longitude: -40.3481814,
      })
    }

    const { gyms } = await sut.execute({
      query: 'TypeScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'TypeScript Gym 21' }),
      expect.objectContaining({ title: 'TypeScript Gym 22' }),
    ])
  })
})

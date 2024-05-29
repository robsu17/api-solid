import { FetchNearbyGyms } from '../fetch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeFetchNarbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const fetchUserCheckInsHistoryUseCase = new FetchNearbyGyms(gymsRepository)
  return fetchUserCheckInsHistoryUseCase
}

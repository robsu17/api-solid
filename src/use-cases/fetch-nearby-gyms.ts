import { Gym } from '@prisma/client'
import { IGymsRepository } from '@/repositories/gyms-repositorty'

interface FetchNearbyGymsRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsResponse {
  gym: Gym[]
}

export class FetchNearbyGyms {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsRequest): Promise<FetchNearbyGymsResponse> {
    const gym = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gym,
    }
  }
}

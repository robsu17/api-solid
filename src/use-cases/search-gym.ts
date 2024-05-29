import { Gym } from '@prisma/client'
import { IGymsRepository } from '@/repositories/gyms-repositorty'

interface SearchGymUseCaseRequest {
  query: string
  page: number
}

interface SearchGymUseCaseResponse {
  gym: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    const gym = await this.gymsRepository.searchManyByQuery(query, page)

    return {
      gym,
    }
  }
}

import { Gym, Prisma } from '@prisma/client'

export interface IGymsRepository {
  items: Gym[]
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}

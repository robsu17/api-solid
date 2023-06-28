import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const searchId = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return searchId;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    const userSameWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return userSameWithEmail;
  }
}

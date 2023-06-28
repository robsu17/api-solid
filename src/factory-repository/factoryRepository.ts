import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { RegisterUseCase } from "@/use-cases/register";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

const prismaUsersRepository = new PrismaUsersRepository();
const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);
const registerUseCase = new RegisterUseCase(prismaUsersRepository);

export class RepositoryFactory {
  async authenticate({ email, password }: AuthenticateUseCaseRequest) {
    await authenticateUseCase.execute({
      email,
      password,
    });
  }

  async register({ name, email, password }: RegisterUseCaseRequest) {
    await registerUseCase.execute({
      name,
      email,
      password,
    });
  }
}

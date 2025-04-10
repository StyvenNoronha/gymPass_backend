import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'

export function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUserRepository()
  const authenticate = new AuthenticateUseCase(prismaUsersRepository)

  return authenticate
}

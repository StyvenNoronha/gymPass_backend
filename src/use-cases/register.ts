import { prismaDB } from '@/db/prisma'
import { PrismaUserRepository } from '@/repositories/prisma-users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  nome: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private userRepository: any) {}

  async execute({ nome, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prismaDB.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('E-mail already exists ')
    }
    

    await this.userRepository.create({
      nome,
      email,
      password_hash,
    })
  }
}

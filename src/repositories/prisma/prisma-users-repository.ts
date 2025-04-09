import { prismaDB } from '@/db/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUserRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prismaDB.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prismaDB.user.create({
      data,
    })
    return user
  }
}

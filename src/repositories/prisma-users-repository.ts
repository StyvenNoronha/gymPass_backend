import { prismaDB } from '@/db/prisma'
import { Prisma } from '@prisma/client'

export class PrismaUserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prismaDB.user.create({
      data,
    })
    return user
  }
}

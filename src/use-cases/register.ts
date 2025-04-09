import { prismaDB } from '@/db/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  nome: string
  email: string
  password: string
}

export async function registerUseCase({
  nome,
  email,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prismaDB.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists ')
  }
  await prismaDB.user.create({
    data: {
      nome,
      email,
      password_hash,
    },
  })
}

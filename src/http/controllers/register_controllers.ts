import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { nome, email, password } = bodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUserRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    await registerUseCase.execute({
      nome,
      email,
      password,
    })
  } catch (error) {
    console.log(error)
    return reply.status(409).send()
  }

  return reply.status(201).send('criado com sucesso')
}

import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialError } from '@/use-cases/errors/invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = bodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUserRepository()
    const authenticate = new AuthenticateUseCase(prismaUsersRepository)

    await authenticate.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }

  return reply.status(200).send({ message: 'autenticado com sucesso' })
}

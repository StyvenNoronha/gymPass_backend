import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { InvalidCredentialError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticade-use-case'

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
    const authenticate = makeAuthenticateUseCase()

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

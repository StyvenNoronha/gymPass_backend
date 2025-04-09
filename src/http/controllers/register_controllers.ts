import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { registerUseCase } from '@/use-cases/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { nome, email, password } = bodySchema.parse(request.body)

  try {
    await registerUseCase({
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

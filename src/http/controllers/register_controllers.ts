import { z } from 'zod'
import { prismaDB } from '@/db/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { nome, email, password } = bodySchema.parse(request.body)

  await prismaDB.user.create({
    data: {
      nome,
      email,
      password_hash: password,
    },
  })

  return reply.status(201).send('criado com sucesso')
}

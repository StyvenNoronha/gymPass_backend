import { z } from 'zod'
import { prismaDB } from '@/db/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { hash } from 'bcryptjs'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { nome, email, password } = bodySchema.parse(request.body)

  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prismaDB.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    return reply.status(409).send('E-mail ja esta cadastrado')
  }
  await prismaDB.user.create({
    data: {
      nome,
      email,
      password_hash,
    },
  })

  return reply.status(201).send('criado com sucesso')
}

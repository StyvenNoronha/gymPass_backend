import fastify from 'fastify'
import { z } from 'zod'
import { prismaDB } from '@/db/prisma'
export const app = fastify()

app.post('/users', async (request, reply) => {
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
})

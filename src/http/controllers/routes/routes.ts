import { FastifyInstance } from 'fastify'
import { register } from '@/http/controllers/register_controllers'
import { authenticate } from '../authenticate_controllers'
export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/auth', authenticate)
}

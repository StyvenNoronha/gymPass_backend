import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  nome: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ nome, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists ')
    }

    await this.userRepository.create({
      nome,
      email,
      password_hash,
    })
  }
}

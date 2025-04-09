import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register.js'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'

describe('register use case', () => {
  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      nome: 'john doe',
      email: 'johnDoe@example.com',
      password: 'batata123',
    })

    const isPasswordCorrectlyHashed = await compare(
      'batata123',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'johnDoe@example.com'

    registerUseCase.execute({
      nome: 'john doe',
      email,
      password: 'batata123',
    })

    await expect(() =>
      registerUseCase.execute({
        nome: 'john doe',
        email,
        password: 'batata123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should  be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      nome: 'john doe',
      email: 'johnDoe@example.com',
      password: 'batata123',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})

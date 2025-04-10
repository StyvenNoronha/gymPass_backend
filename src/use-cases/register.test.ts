import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register.js'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository.js'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('register use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
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
    const email = 'johnDoe@example.com'

    sut.execute({
      nome: 'john doe',
      email,
      password: 'batata123',
    })

    await expect(() =>
      sut.execute({
        nome: 'john doe',
        email,
        password: 'batata123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should  be able to register', async () => {
    const { user } = await sut.execute({
      nome: 'john doe',
      email: 'johnDoe@example.com',
      password: 'batata123',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})

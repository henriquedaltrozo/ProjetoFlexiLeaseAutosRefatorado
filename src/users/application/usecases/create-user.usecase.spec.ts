import 'reflect-metadata'
import { UsersInMemoryRepository } from '@/users/infrastructure/in-memory/repositories/users-in-memory.repository'
import { CreateUserUseCase } from './create-user.usecase'
import { HashProvider } from '@/common/domain/providers/hash-provider'
import { UsersDataBuilder } from '@/users/infrastructure/testing/helpers/users-data-builder'
import { ConflictError } from '@/common/domain/errors/conflict-error'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'

describe('CreateUserUseCase Unit Tests', () => {
  let sut: CreateUserUseCase.UseCase
  let repository: UsersInMemoryRepository
  let hashProvider: HashProvider

  beforeEach(() => {
    repository = new UsersInMemoryRepository()
    hashProvider = {
      generateHash: jest.fn(),
      compareHash: jest.fn(),
    }
    sut = new CreateUserUseCase.UseCase(repository, hashProvider)
  })

  it('should create a user', async () => {
    const spyInsert = jest.spyOn(repository, 'insert')
    const spyGenerateHash = jest.spyOn(hashProvider, 'generateHash')
    spyGenerateHash.mockResolvedValue('hashedPassword')

    const props = UsersDataBuilder({})
    const result = await sut.execute({
      name: props.name,
      email: props.email,
      password: props.password,
    })

    expect(result.id).toBeDefined()
    expect(result.created_at).toBeInstanceOf(Date)
    expect(result.password).toBe('hashedPassword')
    expect(spyInsert).toHaveBeenCalledTimes(1)
    expect(spyGenerateHash).toHaveBeenCalledWith(props.password)
  })

  it('should hash the users password when registering', async () => {
    const spyGenerateHash = jest.spyOn(hashProvider, 'generateHash')
    spyGenerateHash.mockResolvedValue('hashedPassword123')

    const props = UsersDataBuilder({ password: '123456' })
    const result = await sut.execute(props)

    expect(spyGenerateHash).toHaveBeenCalledWith('123456')
    expect(result.password).toBe('hashedPassword123')
  })

  it('should throws error when name not provided', async () => {
    const props = { name: null, email: 'a@a.com', password: '123456' }
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  it('should throws error when email not provided', async () => {
    const props = { name: 'Test name', email: null, password: '123456' }
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  it('should throws error when password not provided', async () => {
    const props = { name: 'Test name', email: 'a@a.com', password: null }
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(
      BadRequestError,
    )
  })

  it('should not be able to register with same email twice', async () => {
    const spyGenerateHash = jest.spyOn(hashProvider, 'generateHash')
    spyGenerateHash.mockResolvedValue('hashedPassword')

    const props = {
      name: 'test name',
      email: 'a@a.com',
      password: '123456',
    }
    await sut.execute(props)

    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(ConflictError)
  })
})

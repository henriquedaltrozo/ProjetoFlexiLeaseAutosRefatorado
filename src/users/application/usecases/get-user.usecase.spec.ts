import 'reflect-metadata'
import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { GetUserUseCase } from './get-user.usecase'
import { UsersRepository } from '@/users/domain/repositories/users.repository'
import { UsersInMemoryRepository } from '@/users/infrastructure/in-memory/repositories/users-in-memory.repository'

describe('GetUserUseCase Unit Tests', () => {
  let sut: GetUserUseCase.UseCase
  let repository: UsersRepository

  beforeEach(() => {
    repository = new UsersInMemoryRepository()
    sut = new GetUserUseCase.UseCase(repository)
  })

  it('should be able to get a user', async () => {
    const spyFindById = jest.spyOn(repository, 'findById')
    const props = {
      name: 'User Test',
      email: 'test@example.com',
      password: 'password123',
    }
    const model = repository.create(props)
    await repository.insert(model)

    const result = await sut.execute({ id: model.id })
    expect(result).toMatchObject(model)
    expect(spyFindById).toHaveBeenCalledTimes(1)
  })

  it('should throws error when user not found', async () => {
    await expect(sut.execute({ id: 'fake-id' })).rejects.toBeInstanceOf(
      NotFoundError,
    )
  })
})

import 'reflect-metadata'
import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { UpdateUserUseCase } from './update-user.usecase'
import { UsersInMemoryRepository } from '@/users/infrastructure/in-memory/repositories/users-in-memory.repository'

describe('UpdateUserUseCase Unit Tests', () => {
  let sut: UpdateUserUseCase.UseCase
  let repository: UsersInMemoryRepository

  beforeEach(() => {
    repository = new UsersInMemoryRepository()
    sut = new UpdateUserUseCase.UseCase(repository)
  })

  test('should throws error when user not found', async () => {
    await expect(sut.execute({ id: 'fake-id' })).rejects.toBeInstanceOf(
      NotFoundError,
    )
  })

  test('should be able to update a user', async () => {
    const spyUpdate = jest.spyOn(repository, 'update')
    const props = {
      name: 'User Test',
      email: 'test@example.com',
      password: 'password123',
    }
    const model = repository.create(props)
    await repository.insert(model)

    const newData = {
      id: model.id,
      name: 'User Updated',
      email: 'updated@example.com',
      password: 'newpassword123',
    }
    const result = await sut.execute(newData)
    expect(result.name).toEqual(newData.name)
    expect(result.email).toEqual(newData.email)
    expect(result.password).toEqual(newData.password)
    expect(spyUpdate).toHaveBeenCalledTimes(1)
  })
})

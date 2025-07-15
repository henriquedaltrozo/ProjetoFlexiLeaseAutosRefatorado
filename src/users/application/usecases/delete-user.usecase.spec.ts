import 'reflect-metadata'
import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { DeleteUserUseCase } from './delete-user.usecase'
import { UsersInMemoryRepository } from '@/users/infrastructure/in-memory/repositories/users-in-memory.repository'
import { UsersDataBuilder } from '@/users/infrastructure/testing/helpers/users-data-builder'

describe('DeleteUserUseCase Unit Tests', () => {
  let sut: DeleteUserUseCase.UseCase
  let repository: UsersInMemoryRepository

  beforeEach(() => {
    repository = new UsersInMemoryRepository()
    sut = new DeleteUserUseCase.UseCase(repository)
  })

  test('should throws error when user not found', async () => {
    await expect(async () => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      NotFoundError,
    )
    await expect(async () => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError(`Model not found using ID fakeId`),
    )
  })

  test('should be able to delete a user', async () => {
    const spyDelete = jest.spyOn(repository, 'delete')
    const user = await repository.insert(UsersDataBuilder({}))
    expect(repository.items.length).toBe(1)

    await sut.execute({ id: user.id })
    expect(spyDelete).toHaveBeenCalledTimes(1)
    expect(repository.items.length).toBe(0)
  })
})

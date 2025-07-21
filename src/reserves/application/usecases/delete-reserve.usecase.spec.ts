import 'reflect-metadata'
import { DeleteReserveUseCase } from '@/reserves/application/usecases/delete-reserve.usecase'
import { ReservesInMemoryRepository } from '@/reserves/infrastructure/in-memory/repositories/reserves-in-memory.repository'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'
import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { ReservesDataBuilder } from '@/reserves/infrastructure/testing/reserves-data-builder'

describe('DeleteReserveUseCase Unit Tests', () => {
  let useCase: DeleteReserveUseCase.UseCase
  let reservesRepository: ReservesInMemoryRepository

  beforeEach(() => {
    reservesRepository = new ReservesInMemoryRepository()
    useCase = new DeleteReserveUseCase.UseCase(reservesRepository)
  })

  it('should delete a reserve', async () => {
    const spyDelete = jest.spyOn(reservesRepository, 'delete')
    const reserve = await reservesRepository.insert(ReservesDataBuilder({}))
    expect(reservesRepository.items).toHaveLength(1)

    await useCase.execute({ id: reserve.id })

    expect(spyDelete).toHaveBeenCalledTimes(1)
    expect(reservesRepository.items).toHaveLength(0)
  })

  it('should throw error when id is not provided', async () => {
    await expect(() => useCase.execute({ id: '' })).rejects.toThrow(
      BadRequestError,
    )
  })

  it('should throw error when reserve is not found', async () => {
    await expect(() => useCase.execute({ id: 'fakeId' })).rejects.toThrow(
      NotFoundError,
    )
    await expect(() => useCase.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Model not found using ID fakeId'),
    )
  })
})

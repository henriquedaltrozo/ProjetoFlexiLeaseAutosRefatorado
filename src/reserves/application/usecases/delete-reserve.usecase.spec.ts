import 'reflect-metadata'
import { DeleteReserveUseCase } from '@/reserves/application/usecases/delete-reserve.usecase'
import { ReservesInMemoryRepository } from '@/reserves/infrastructure/in-memory/repositories/reserves-in-memory.repository'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'
import { NotFoundError } from '@/common/domain/errors/not-found-error'

describe('DeleteReserveUseCase Unit Tests', () => {
  let useCase: DeleteReserveUseCase.UseCase
  let reservesRepository: ReservesInMemoryRepository

  beforeEach(() => {
    reservesRepository = new ReservesInMemoryRepository()
    useCase = new DeleteReserveUseCase.UseCase(reservesRepository)
  })

  it('should delete a reserve', async () => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const dayAfterTomorrow = new Date(Date.now() + 48 * 60 * 60 * 1000)

    const reserve = reservesRepository.create({
      start_date: tomorrow,
      end_date: dayAfterTomorrow,
      vehicle_id: 'vehicle-id',
      user_id: 'user-id',
    })
    await reservesRepository.insert(reserve)

    expect(reservesRepository.items).toHaveLength(1)

    await useCase.execute({ id: reserve.id })

    expect(reservesRepository.items).toHaveLength(0)
  })

  it('should throw error when id is not provided', async () => {
    const input: DeleteReserveUseCase.Input = {
      id: '',
    }

    await expect(useCase.execute(input)).rejects.toThrow(BadRequestError)
  })

  it('should throw error when reserve is not found', async () => {
    const input: DeleteReserveUseCase.Input = {
      id: 'non-existent-id',
    }

    await expect(useCase.execute(input)).rejects.toThrow(NotFoundError)
  })
})

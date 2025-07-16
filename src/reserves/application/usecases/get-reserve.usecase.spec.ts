import 'reflect-metadata'
import { GetReserveUseCase } from '@/reserves/application/usecases/get-reserve.usecase'
import { ReservesInMemoryRepository } from '@/reserves/infrastructure/in-memory/repositories/reserves-in-memory.repository'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'
import { NotFoundError } from '@/common/domain/errors/not-found-error'

describe('GetReserveUseCase Unit Tests', () => {
  let useCase: GetReserveUseCase.UseCase
  let reservesRepository: ReservesInMemoryRepository

  beforeEach(() => {
    reservesRepository = new ReservesInMemoryRepository()
    useCase = new GetReserveUseCase.UseCase(reservesRepository)
  })

  it('should get a reserve by id', async () => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const dayAfterTomorrow = new Date(Date.now() + 48 * 60 * 60 * 1000)

    const reserve = reservesRepository.create({
      start_date: tomorrow,
      end_date: dayAfterTomorrow,
      id_car: 'car-id',
      id_user: 'user-id',
    })
    await reservesRepository.insert(reserve)

    const input: GetReserveUseCase.Input = {
      id: reserve.id,
    }

    const output = await useCase.execute(input)

    expect(output.id).toBe(reserve.id)
    expect(output.start_date).toEqual(tomorrow)
    expect(output.end_date).toEqual(dayAfterTomorrow)
    expect(output.id_car).toBe('car-id')
    expect(output.id_user).toBe('user-id')
    expect(output.created_at).toBeDefined()
    expect(output.updated_at).toBeDefined()
  })

  it('should throw error when id is not provided', async () => {
    const input: GetReserveUseCase.Input = {
      id: '',
    }

    await expect(useCase.execute(input)).rejects.toThrow(BadRequestError)
  })

  it('should throw error when reserve is not found', async () => {
    const input: GetReserveUseCase.Input = {
      id: 'non-existent-id',
    }

    await expect(useCase.execute(input)).rejects.toThrow(NotFoundError)
  })
})

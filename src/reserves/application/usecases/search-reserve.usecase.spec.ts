import 'reflect-metadata'
import { SearchReserveUseCase } from '@/reserves/application/usecases/search-reserve.usecase'
import { ReservesInMemoryRepository } from '@/reserves/infrastructure/in-memory/repositories/reserves-in-memory.repository'

describe('SearchReserveUseCase Unit Tests', () => {
  let useCase: SearchReserveUseCase.UseCase
  let reservesRepository: ReservesInMemoryRepository

  beforeEach(() => {
    reservesRepository = new ReservesInMemoryRepository()
    useCase = new SearchReserveUseCase.UseCase(reservesRepository)
  })

  it('should return the reserves ordered by created_at', async () => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const dayAfterTomorrow = new Date(Date.now() + 48 * 60 * 60 * 1000)

    const reserves = []
    for (let i = 0; i < 3; i++) {
      const reserve = reservesRepository.create({
        start_date: tomorrow,
        end_date: dayAfterTomorrow,
        vehicle_id: `vehicle-id-${i}`,
        user_id: `user-id-${i}`,
      })
      await reservesRepository.insert(reserve)
      reserves.push(reserve)
    }

    const result = await useCase.execute({})

    expect(result.items).toHaveLength(3)
    expect(result.total).toBe(3)
    expect(result.current_page).toBe(1)
    expect(result.last_page).toBe(1)
    expect(result.per_page).toBe(15)
  })

  it('should return output using pagination, sort and filter', async () => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const dayAfterTomorrow = new Date(Date.now() + 48 * 60 * 60 * 1000)

    const reserves = []
    const userIds = ['user-aaa', 'user-bbb', 'user-ccc']

    for (let i = 0; i < 3; i++) {
      const reserve = reservesRepository.create({
        start_date: tomorrow,
        end_date: dayAfterTomorrow,
        vehicle_id: `vehicle-id-${i}`,
        user_id: userIds[i],
      })
      await reservesRepository.insert(reserve)
      reserves.push(reserve)
    }

    const output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: 'start_date',
      sort_dir: 'asc',
      filter: 'aaa',
    })

    expect(output.items).toHaveLength(1)
    expect(output.total).toBe(1)
    expect(output.current_page).toBe(1)
    expect(output.last_page).toBe(1)
    expect(output.per_page).toBe(2)
  })

  it('should return empty when no reserves match filter', async () => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const dayAfterTomorrow = new Date(Date.now() + 48 * 60 * 60 * 1000)

    const reserve = reservesRepository.create({
      start_date: tomorrow,
      end_date: dayAfterTomorrow,
      vehicle_id: 'vehicle-id',
      user_id: 'user-id',
    })
    await reservesRepository.insert(reserve)

    const output = await useCase.execute({
      filter: 'non-existent',
    })

    expect(output.items).toHaveLength(0)
    expect(output.total).toBe(0)
    expect(output.current_page).toBe(1)
    expect(output.last_page).toBe(0)
    expect(output.per_page).toBe(15)
  })

  it('should apply pagination correctly', async () => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const dayAfterTomorrow = new Date(Date.now() + 48 * 60 * 60 * 1000)

    const reserves = []
    for (let i = 0; i < 5; i++) {
      const reserve = reservesRepository.create({
        start_date: tomorrow,
        end_date: dayAfterTomorrow,
        vehicle_id: `vehicle-id-${i}`,
        user_id: `user-id-${i}`,
      })
      await reservesRepository.insert(reserve)
      reserves.push(reserve)
    }

    const output = await useCase.execute({
      page: 2,
      per_page: 2,
    })

    expect(output.items).toHaveLength(2)
    expect(output.total).toBe(5)
    expect(output.current_page).toBe(2)
    expect(output.per_page).toBe(2)
    expect(output.last_page).toBe(3)
  })
})

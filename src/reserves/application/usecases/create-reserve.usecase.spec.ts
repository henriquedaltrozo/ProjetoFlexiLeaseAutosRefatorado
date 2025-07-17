import 'reflect-metadata'
import { CreateReserveUseCase } from '@/reserves/application/usecases/create-reserve.usecase'
import { ReservesInMemoryRepository } from '@/reserves/infrastructure/in-memory/repositories/reserves-in-memory.repository'
import { UsersInMemoryRepository } from '@/users/infrastructure/in-memory/repositories/users-in-memory.repository'
import { VehiclesInMemoryRepository } from '@/vehicles/infrastructure/in-memory/repositories/vehicles-in-memory.repository'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'
import { ConflictError } from '@/common/domain/errors/conflict-error'

describe('CreateReserveUseCase Unit Tests', () => {
  let useCase: CreateReserveUseCase.UseCase
  let reservesRepository: ReservesInMemoryRepository
  let usersRepository: UsersInMemoryRepository
  let vehiclesRepository: VehiclesInMemoryRepository

  beforeEach(() => {
    reservesRepository = new ReservesInMemoryRepository()
    usersRepository = new UsersInMemoryRepository()
    vehiclesRepository = new VehiclesInMemoryRepository()
    useCase = new CreateReserveUseCase.UseCase(
      reservesRepository,
      usersRepository,
      vehiclesRepository,
    )
  })

  it('should create a reserve', async () => {
    const user = usersRepository.create({
      name: 'Test User',
      email: 'test@test.com',
      password: 'password123',
    })
    await usersRepository.insert(user)

    const vehicle = vehiclesRepository.create({
      name: 'Test Vehicle',
      color: 'Red',
      year: 2023,
      value_per_day: 100,
      number_of_passengers: 4,
    })
    await vehiclesRepository.insert(vehicle)

    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const dayAfterTomorrow = new Date(Date.now() + 48 * 60 * 60 * 1000)

    const input: CreateReserveUseCase.Input = {
      start_date: tomorrow.toISOString(),
      end_date: dayAfterTomorrow.toISOString(),
      id_vehicle: vehicle.id,
      id_user: user.id,
    }

    const output = await useCase.execute(input)

    expect(output.id).toBeDefined()
    expect(output.start_date).toEqual(tomorrow)
    expect(output.end_date).toEqual(dayAfterTomorrow)
    expect(output.id_vehicle).toBe(vehicle.id)
    expect(output.id_user).toBe(user.id)
  })

  it('should throw error when required data is not provided', async () => {
    const input: CreateReserveUseCase.Input = {
      start_date: '',
      end_date: '',
      id_vehicle: '',
      id_user: '',
    }

    await expect(useCase.execute(input)).rejects.toThrow(BadRequestError)
  })

  it('should throw error when start date is after end date', async () => {
    const user = usersRepository.create({
      name: 'Test User',
      email: 'test@test.com',
      password: 'password123',
    })
    await usersRepository.insert(user)

    const vehicle = vehiclesRepository.create({
      name: 'Test Vehicle',
      color: 'Red',
      year: 2023,
      value_per_day: 100,
      number_of_passengers: 4,
    })
    await vehiclesRepository.insert(vehicle)

    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const today = new Date()

    const input: CreateReserveUseCase.Input = {
      start_date: tomorrow.toISOString(),
      end_date: today.toISOString(),
      id_vehicle: vehicle.id,
      id_user: user.id,
    }

    await expect(useCase.execute(input)).rejects.toThrow(BadRequestError)
  })

  it('should throw error when dates conflict with existing reservation', async () => {
    const user = usersRepository.create({
      name: 'Test User',
      email: 'test@test.com',
      password: 'password123',
    })
    await usersRepository.insert(user)

    const vehicle = vehiclesRepository.create({
      name: 'Test Vehicle',
      color: 'Red',
      year: 2023,
      value_per_day: 100,
      number_of_passengers: 4,
    })
    await vehiclesRepository.insert(vehicle)

    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const dayAfterTomorrow = new Date(Date.now() + 48 * 60 * 60 * 1000)

    const existingReserve = reservesRepository.create({
      start_date: tomorrow,
      end_date: dayAfterTomorrow,
      id_vehicle: vehicle.id,
      id_user: user.id,
    })
    await reservesRepository.insert(existingReserve)

    const input: CreateReserveUseCase.Input = {
      start_date: tomorrow.toISOString(),
      end_date: dayAfterTomorrow.toISOString(),
      id_vehicle: vehicle.id,
      id_user: user.id,
    }

    await expect(useCase.execute(input)).rejects.toThrow(ConflictError)
  })
})

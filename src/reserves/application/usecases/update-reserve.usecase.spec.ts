import 'reflect-metadata'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'
import { ConflictError } from '@/common/domain/errors/conflict-error'
import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { UpdateReserveUseCase } from '@/reserves/application/usecases/update-reserve.usecase'
import { ReservesInMemoryRepository } from '@/reserves/infrastructure/in-memory/repositories/reserves-in-memory.repository'
import { UsersInMemoryRepository } from '@/users/infrastructure/in-memory/repositories/users-in-memory.repository'
import { VehiclesInMemoryRepository } from '@/vehicles/infrastructure/in-memory/repositories/vehicles-in-memory.repository'

describe('UpdateReserveUseCase Unit Tests', () => {
  let useCase: UpdateReserveUseCase.UseCase
  let reservesRepository: ReservesInMemoryRepository
  let usersRepository: UsersInMemoryRepository
  let vehiclesRepository: VehiclesInMemoryRepository

  beforeEach(() => {
    reservesRepository = new ReservesInMemoryRepository()
    usersRepository = new UsersInMemoryRepository()
    vehiclesRepository = new VehiclesInMemoryRepository()
    useCase = new UpdateReserveUseCase.UseCase(reservesRepository)
  })

  it('should update a reserve successfully', async () => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const dayAfterTomorrow = new Date(Date.now() + 48 * 60 * 60 * 1000)
    const threeDaysLater = new Date(Date.now() + 72 * 60 * 60 * 1000)

    const user = usersRepository.create({
      name: 'John Doe',
      email: 'john@test.com',
      password: 'password123',
    })
    await usersRepository.insert(user)

    const vehicle = vehiclesRepository.create({
      model: 'Test Car',
      brand: 'Test Brand',
      year: 2023,
      license_plate: 'ABC1234',
      color: 'Blue',
      category: 'Economy',
    })
    await vehiclesRepository.insert(vehicle)

    const reserve = reservesRepository.create({
      start_date: tomorrow,
      end_date: dayAfterTomorrow,
      id_vehicle: vehicle.id,
      id_user: user.id,
    })
    await reservesRepository.insert(reserve)

    const output = await useCase.execute({
      id: reserve.id,
      start_date: tomorrow.toISOString(),
      end_date: threeDaysLater.toISOString(),
      id_vehicle: vehicle.id,
      id_user: user.id,
    })

    expect(output.id).toBe(reserve.id)
    expect(output.end_date).toEqual(threeDaysLater)
    expect(output.start_date).toEqual(tomorrow)
    expect(output.id_vehicle).toBe(vehicle.id)
    expect(output.id_user).toBe(user.id)
  })

  it('should throw NotFoundError when reserve does not exist', async () => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const dayAfterTomorrow = new Date(Date.now() + 48 * 60 * 60 * 1000)

    await expect(
      useCase.execute({
        id: 'non-existent-id',
        start_date: tomorrow.toISOString(),
        end_date: dayAfterTomorrow.toISOString(),
        id_vehicle: 'car-id',
        id_user: 'user-id',
      }),
    ).rejects.toThrow(
      new NotFoundError('Model not found using ID non-existent-id'),
    )
  })

  it('should throw BadRequestError when start_date is in the past', async () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)

    const reserve = reservesRepository.create({
      start_date: tomorrow,
      end_date: new Date(Date.now() + 48 * 60 * 60 * 1000),
      id_vehicle: 'car-id',
      id_user: 'user-id',
    })
    await reservesRepository.insert(reserve)

    await expect(
      useCase.execute({
        id: reserve.id,
        start_date: yesterday.toISOString(),
        end_date: tomorrow.toISOString(),
        id_vehicle: 'car-id',
        id_user: 'user-id',
      }),
    ).rejects.toThrow(new BadRequestError('Start date cannot be in the past'))
  })

  it('should throw BadRequestError when start_date is after end_date', async () => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const dayAfterTomorrow = new Date(Date.now() + 48 * 60 * 60 * 1000)

    const reserve = reservesRepository.create({
      start_date: tomorrow,
      end_date: dayAfterTomorrow,
      id_vehicle: 'car-id',
      id_user: 'user-id',
    })
    await reservesRepository.insert(reserve)

    await expect(
      useCase.execute({
        id: reserve.id,
        start_date: dayAfterTomorrow.toISOString(),
        end_date: tomorrow.toISOString(),
        id_vehicle: 'car-id',
        id_user: 'user-id',
      }),
    ).rejects.toThrow(new BadRequestError('Start date must be before end date'))
  })

  it('should throw ConflictError when there is a date conflict with another reserve', async () => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const dayAfterTomorrow = new Date(Date.now() + 48 * 60 * 60 * 1000)
    const threeDaysLater = new Date(Date.now() + 72 * 60 * 60 * 1000)

    const user = usersRepository.create({
      name: 'John Doe',
      email: 'john@test.com',
      password: 'password123',
    })
    await usersRepository.insert(user)

    const vehicle = vehiclesRepository.create({
      model: 'Test Car',
      brand: 'Test Brand',
      year: 2023,
      license_plate: 'ABC1234',
      color: 'Blue',
      category: 'Economy',
    })
    await vehiclesRepository.insert(vehicle)

    const existingReserve = reservesRepository.create({
      start_date: dayAfterTomorrow,
      end_date: threeDaysLater,
      id_vehicle: vehicle.id,
      id_user: user.id,
    })
    await reservesRepository.insert(existingReserve)

    const reserveToUpdate = reservesRepository.create({
      start_date: tomorrow,
      end_date: dayAfterTomorrow,
      id_vehicle: vehicle.id,
      id_user: user.id,
    })
    await reservesRepository.insert(reserveToUpdate)

    await expect(
      useCase.execute({
        id: reserveToUpdate.id,
        start_date: tomorrow.toISOString(),
        end_date: threeDaysLater.toISOString(),
        id_vehicle: vehicle.id,
        id_user: user.id,
      }),
    ).rejects.toThrow(
      new ConflictError('Vehicle is already reserved for the selected period'),
    )
  })
})

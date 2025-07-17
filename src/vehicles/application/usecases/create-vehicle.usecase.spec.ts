import { BadRequestError } from '@/common/domain/errors/bad-request-error'
import { VehiclesRepository } from '@/vehicles/domain/repositories/vehicles.repository'
import { CreateVehicleUseCase } from './create-vehicle.usecase'
import { VehiclesInMemoryRepository } from '@/vehicles/infrastructure/in-memory/repositories/vehicles-in-memory.repository'

describe('CreateVehicleUseCase Unit Tests', () => {
  let sut: CreateVehicleUseCase.UseCase
  let repository: VehiclesRepository

  beforeEach(() => {
    repository = new VehiclesInMemoryRepository()
    sut = new CreateVehicleUseCase.UseCase(repository)
  })

  it('should create a vehicle', async () => {
    const spyInsert = jest.spyOn(repository, 'insert')

    const props = {
      name: 'Vehicle 1',
      color: 'Blue',
      year: 2022,
      value_per_day: 150,
      number_of_passengers: 4,
    }

    const result = await sut.execute(props)
    expect(result.id).toBeDefined()
    expect(result.created_at).toBeInstanceOf(Date)
    expect(result.updated_at).toBeInstanceOf(Date)
    expect(result.name).toBe('Vehicle 1')
    expect(spyInsert).toHaveBeenCalledTimes(1)
  })

  it('should throw error if name is missing', async () => {
    const props = {
      name: '',
      color: 'Blue',
      year: 2020,
      value_per_day: 100,
      number_of_passengers: 5,
    }

    await expect(sut.execute(props)).rejects.toBeInstanceOf(BadRequestError)
  })

  it('should throw error if value_per_day is not greater than 0', async () => {
    const props = {
      name: 'Vehicle 1',
      color: 'Blue',
      year: 2021,
      value_per_day: 0,
      number_of_passengers: 5,
    }

    await expect(sut.execute(props)).rejects.toBeInstanceOf(BadRequestError)
  })

  it('should throw error if number_of_passengers is less than or equal to 1', async () => {
    const props = {
      name: 'Vehicle 2',
      color: 'Black',
      year: 2019,
      value_per_day: 80,
      number_of_passengers: 1,
    }

    await expect(sut.execute(props)).rejects.toBeInstanceOf(BadRequestError)
  })
})

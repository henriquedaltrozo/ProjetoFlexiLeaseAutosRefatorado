import 'reflect-metadata'
import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { GetVehicleUseCase } from './get-vehicle.usecase'
import { VehiclesRepository } from '@/vehicles/domain/repositories/vehicles.repository'
import { VehiclesInMemoryRepository } from '@/vehicles/infrastructure/in-memory/repositories/vehicles-in-memory.repository'

describe('GetVehicleUseCase Unit Tests', () => {
  let sut: GetVehicleUseCase.UseCase
  let repository: VehiclesRepository

  beforeEach(() => {
    repository = new VehiclesInMemoryRepository()
    sut = new GetVehicleUseCase.UseCase(repository)
  })

  it('should be able to get a vehicle', async () => {
    const spyFindById = jest.spyOn(repository, 'findById')
    const props = {
      name: 'Vehicle 1',
      color: 'Blue',
      year: 2022,
      value_per_day: 150,
      number_of_passengers: 4,
    }
    const model = repository.create(props)
    await repository.insert(model)

    const result = await sut.execute({ id: model.id })
    expect(result).toMatchObject(model)
    expect(spyFindById).toHaveBeenCalledTimes(1)
  })

  it('should throws error when product not found', async () => {
    await expect(sut.execute({ id: 'fake-id' })).rejects.toBeInstanceOf(
      NotFoundError,
    )
  })
})

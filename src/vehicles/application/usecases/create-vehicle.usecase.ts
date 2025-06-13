import { BadRequestError } from '@/common/domain/errors/bad-request-error'
import { VehiclesRepository } from '@/vehicles/domain/repositories/vehicles.repository'
import { inject, injectable } from 'tsyringe'
import { VehicleOutput } from '../dtos/vehicle-output.dto'

export namespace CreateVehicleUseCase {
  export type Input = {
    name: string
    color: string
    year: number
    value_per_day: number
    number_of_passengers: number
  }

  export type Output = VehicleOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('VehicleRepository')
      private vehiclesRepository: VehiclesRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      if (
        !input.name ||
        !input.color ||
        !input.year ||
        input.value_per_day <= 0 ||
        input.number_of_passengers <= 1
      ) {
        throw new BadRequestError('Input data not provided or invalid')
      }

      const vehicle = this.vehiclesRepository.create(input)
      const createdVehicle: VehicleOutput =
        await this.vehiclesRepository.insert(vehicle)

      return createdVehicle
    }
  }
}

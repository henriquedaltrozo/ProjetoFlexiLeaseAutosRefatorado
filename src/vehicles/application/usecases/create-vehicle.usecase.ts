import { BadRequestError } from '@/common/domain/errors/bad-request-error'
import { VehiclesRepository } from '@/vehicles/domain/repositories/vehicles.repository'
import { inject, injectable } from 'tsyringe'

export namespace CreateVehicleUseCase {
  export type Input = {
    name: string
    color: string
    year: number
    value_per_day: number
    number_of_passengers: number
  }

  export type Output = {
    id: string
    name: string
    color: string
    year: number
    value_per_day: number
    number_of_passengers: number
    created_at: Date
    updated_at: Date
  }

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

      await this.vehiclesRepository.conflictingName(input.name)

      const vehicle = await this.vehiclesRepository.create(input)
      await this.vehiclesRepository.insert(vehicle)

      return {
        id: vehicle.id,
        name: vehicle.name,
        color: vehicle.color,
        year: vehicle.year,
        value_per_day: vehicle.value_per_day,
        number_of_passengers: vehicle.number_of_passengers,
        created_at: vehicle.created_at,
        updated_at: vehicle.updated_at,
      }
    }
  }
}

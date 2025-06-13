import { inject, injectable } from 'tsyringe'
import { VehicleOutput } from '../dtos/vehicle-output.dto'
import { VehiclesRepository } from '@/vehicles/domain/repositories/vehicles.repository'

export namespace UpdateVehicleUseCase {
  export type Input = {
    id: string
    name?: string
    color?: string
    year?: number
    value_per_day?: number
    number_of_passengers?: number
  }

  export type Output = VehicleOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('VehicleRepository')
      private vehiclesRepository: VehiclesRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const vehicle = await this.vehiclesRepository.findById(input.id)

      if (input.name) {
        vehicle.name = input.name
      }

      if (input.color) {
        vehicle.color = input.color
      }

      if (input.year) {
        vehicle.year = input.year
      }

      if (input.value_per_day) {
        vehicle.value_per_day = input.value_per_day
      }

      if (input.number_of_passengers) {
        vehicle.number_of_passengers = input.number_of_passengers
      }

      const updatedVehicle: VehicleOutput =
        await this.vehiclesRepository.update(vehicle)

      return updatedVehicle
    }
  }
}

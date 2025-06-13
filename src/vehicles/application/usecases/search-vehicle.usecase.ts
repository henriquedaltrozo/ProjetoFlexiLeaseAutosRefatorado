import { inject, injectable } from 'tsyringe'
import { SearchInputDto } from '../dtos/search-input.dto'
import { VehiclesRepository } from '@/vehicles/domain/repositories/vehicles.repository'
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '../dtos/pagination-output.dto'
import { VehicleModel } from '@/vehicles/domain/models/vehicles.model'

export namespace SearchVehicleUseCase {
  export type Input = SearchInputDto

  export type Output = PaginationOutputDto<VehicleModel>

  @injectable()
  export class UseCase {
    constructor(
      @inject('VehiclesRepository')
      private vehiclesRepository: VehiclesRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const searchResult = await this.vehiclesRepository.search(input)
      return PaginationOutputMapper.toOutput(searchResult.items, searchResult)
    }
  }
}

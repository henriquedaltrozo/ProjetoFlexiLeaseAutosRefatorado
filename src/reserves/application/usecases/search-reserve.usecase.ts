import { inject, injectable } from 'tsyringe'
import { ReservePaginationOutput } from '../dtos/pagination-output.dto'
import { SearchInput } from '../dtos/search-input.dto'
import { ReservesRepository } from '@/reserves/domain/repositories/reserves.repository'

export namespace SearchReserveUseCase {
  export type Input = SearchInput

  export type Output = ReservePaginationOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('ReservesRepository')
      private reservesRepository: ReservesRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const result = await this.reservesRepository.search(input)
      return {
        ...result,
        last_page: Math.ceil(result.total / result.per_page),
      }
    }
  }
}

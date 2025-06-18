import { inject, injectable } from 'tsyringe'
import { UserModel } from '@/users/domain/models/users.model'
import { UsersRepository } from '@/users/domain/repositories/users.repository'
import { SearchInputDto } from '@/vehicles/application/dtos/search-input.dto'
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '@/vehicles/application/dtos/pagination-output.dto'

export namespace SearchUserUseCase {
  export type Input = SearchInputDto

  export type Output = PaginationOutputDto<UserModel>

  @injectable()
  export class UseCase {
    constructor(
      @inject('UsersRepository')
      private usersRepository: UsersRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const searchResult = await this.usersRepository.search(input)
      return PaginationOutputMapper.toOutput(searchResult.items, searchResult)
    }
  }
}

import { UsersRepository } from '@/users/domain/repositories/users.repository'
import { inject, injectable } from 'tsyringe'
import { UserOutput } from '../dtos/user-output.dto'

export namespace GetUserUseCase {
  export type Input = {
    id: string
  }

  export type Output = UserOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('UsersRepository')
      private usersRepository: UsersRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const user: UserOutput = await this.usersRepository.findById(input.id)

      return user
    }
  }
}

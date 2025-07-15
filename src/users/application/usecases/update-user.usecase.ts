import { inject, injectable } from 'tsyringe'
import { UserOutput } from '../dtos/user-output.dto'
import { UsersRepository } from '@/users/domain/repositories/users.repository'

export namespace UpdateUserUseCase {
  export type Input = {
    id: string
    name?: string
    email?: string
    password?: string
  }

  export type Output = UserOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('UsersRepository')
      private usersRepository: UsersRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const user = await this.usersRepository.findById(input.id)

      if (input.name) {
        user.name = input.name
      }

      if (input.email) {
        user.email = input.email
      }

      if (input.password) {
        user.password = input.password
      }

      const updatedUser: UserOutput = await this.usersRepository.update(user)

      return updatedUser
    }
  }
}

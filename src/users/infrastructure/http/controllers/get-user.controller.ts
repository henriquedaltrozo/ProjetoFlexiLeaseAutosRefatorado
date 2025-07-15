import { Request, Response } from 'express'
import { z } from 'zod'
import { container } from 'tsyringe'
import { GetUserUseCase } from '@/users/application/usecases/get-user.usecase'
import { dataValidation } from '@/common/infrastructure/validation/zod'

export async function getUserController(request: Request, response: Response) {
  const getUserParamSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = dataValidation(getUserParamSchema, request.params)

  const getUserUseCase: GetUserUseCase.UseCase =
    container.resolve('GetUserUseCase')

  const user = await getUserUseCase.execute({ id })

  return response.status(200).json(user)
}

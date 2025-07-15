import { Request, Response } from 'express'
import { z } from 'zod'
import { container } from 'tsyringe'
import { dataValidation } from '@/common/infrastructure/validation/zod'
import { DeleteUserUseCase } from '@/users/application/usecases/delete-user.usecase'

export async function deleteUserController(
  request: Request,
  response: Response,
) {
  const deleteUserParamSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = dataValidation(deleteUserParamSchema, request.params)

  const deleteUserUseCase: DeleteUserUseCase.UseCase =
    container.resolve('DeleteUserUseCase')

  await deleteUserUseCase.execute({ id })

  return response.status(204).send()
}

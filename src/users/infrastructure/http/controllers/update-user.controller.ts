import { Request, Response } from 'express'
import { z } from 'zod'
import { container } from 'tsyringe'
import { dataValidation } from '@/common/infrastructure/validation/zod'
import { UpdateUserUseCase } from '@/users/application/usecases/update-user.usecase'

export async function updateUserController(
  request: Request,
  response: Response,
) {
  const updateUserBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
  })

  const { name, email, password } = dataValidation(
    updateUserBodySchema,
    request.body,
  )

  const updateUserParamSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = dataValidation(updateUserParamSchema, request.params)

  const updateUserUseCase: UpdateUserUseCase.UseCase =
    container.resolve('UpdateUserUseCase')

  const user = await updateUserUseCase.execute({
    id,
    name,
    email,
    password,
  })

  return response.status(200).json(user)
}

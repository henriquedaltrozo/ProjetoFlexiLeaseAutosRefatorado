import { Request, Response } from 'express'
import { dataValidation } from '@/common/infrastructure/validation/zod'
import { CreateReserveUseCase } from '@/reserves/application/usecases/create-reserve.usecase'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function createReserveController(
  request: Request,
  response: Response,
): Promise<Response> {
  const bodySchema = z.object({
    start_date: z.string(),
    end_date: z.string(),
    id_vehicle: z.string(),
    id_user: z.string(),
  })

  const { start_date, end_date, id_vehicle, id_user } = dataValidation(
    bodySchema,
    request.body,
  )

  const createReserveUseCase: CreateReserveUseCase.UseCase = container.resolve(
    'CreateReserveUseCase',
  )

  const reserve = await createReserveUseCase.execute({
    start_date,
    end_date,
    id_vehicle,
    id_user,
  })

  return response.status(201).json(reserve)
}

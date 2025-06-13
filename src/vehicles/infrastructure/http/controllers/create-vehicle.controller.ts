import { Request, Response } from 'express'
import { z } from 'zod'
import { CreateVehicleUseCase } from '@/vehicles/application/usecases/create-vehicle.usecase'
import { container } from 'tsyringe'
import { dataValidation } from '@/common/infrastructure/validation/zod'

export async function createVehicleController(
  request: Request,
  response: Response,
) {
  const createVehicleBodySchema = z.object({
    name: z.string(),
    color: z.string(),
    year: z.number(),
    value_per_day: z.number(),
    number_of_passengers: z.number(),
  })

  const { name, color, year, value_per_day, number_of_passengers } =
    dataValidation(createVehicleBodySchema, request.body)

  const createVehicleUseCase: CreateVehicleUseCase.UseCase = container.resolve(
    'CreateVehicleUseCase',
  )

  const vehicle = await createVehicleUseCase.execute({
    name,
    color,
    year,
    value_per_day,
    number_of_passengers,
  })

  return response.status(201).json(vehicle)
}

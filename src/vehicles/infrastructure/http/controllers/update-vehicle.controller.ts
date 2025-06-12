import { Request, Response } from 'express'
import { z } from 'zod'
import { container } from 'tsyringe'
import { dataValidation } from '@/common/infrastructure/validation/zod'
import { UpdateVehicleUseCase } from '@/vehicles/application/usecases/update-vehicle.usecase'

export async function updateVehicleController(
  request: Request,
  response: Response,
) {
  const updateVehicleBodySchema = z.object({
    name: z.string().optional(),
    color: z.string().optional(),
    year: z.number().optional(),
    value_per_day: z.number().optional(),
    number_of_passengers: z.number().optional(),
  })

  const { name, color, year, value_per_day, number_of_passengers } =
    dataValidation(updateVehicleBodySchema, request.body)

  const updateVehicleParamSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = dataValidation(updateVehicleParamSchema, request.params)

  const updateVehicleUseCase: UpdateVehicleUseCase.UseCase = container.resolve(
    'UpdateVehicleUseCase',
  )

  const vehicle = await updateVehicleUseCase.execute({
    id,
    name,
    color,
    year,
    value_per_day,
    number_of_passengers,
  })

  return response.status(200).json(vehicle)
}

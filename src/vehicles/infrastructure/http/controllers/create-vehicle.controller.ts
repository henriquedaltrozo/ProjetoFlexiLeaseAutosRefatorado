import { AppError } from '@/common/domain/errors/app-error'
import { Request, Response } from 'express'
import { z } from 'zod'
import { CreateVehicleUseCase } from '@/vehicles/application/usecases/create-vehicle.usecase'
import { container } from 'tsyringe'

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

  const validatedData = createVehicleBodySchema.safeParse(request.body)

  if (validatedData.success === false) {
    console.error('Invalid data', validatedData.error.format())
    throw new AppError(
      `${validatedData.error.errors.map(err => {
        return `${err.path} -> ${err.message}`
      })}`,
    )
  }

  const { name, color, year, value_per_day, number_of_passengers } =
    validatedData.data

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

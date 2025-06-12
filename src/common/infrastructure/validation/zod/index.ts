import { AppError } from '@/common/domain/errors/app-error'

export function dataValidation(schema: any, data: any) {
  const validatedData = schema.safeParse(data)

  if (validatedData.success === false) {
    console.error('Invalid data', validatedData.error.format())
    throw new AppError(
      `${validatedData.error.errors.map(err => {
        return `${err.path} -> ${err.message}`
      })}`,
    )
  }
  return validatedData.data
}

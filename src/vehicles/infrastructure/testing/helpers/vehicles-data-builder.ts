import { faker } from '@faker-js/faker'
import { VehicleModel } from '@/vehicles/domain/models/vehicles.model'
import { randomUUID } from 'node:crypto'

export function VehiclesDataBuilder(
  props: Partial<VehicleModel>,
): VehicleModel {
  return {
    id: props.id ?? randomUUID(),
    name: props.name ?? faker.vehicle.vehicle(),
    color: props.color ?? faker.color.human(),
    year: props.year ?? faker.number.int({ min: 2000, max: 2024 }),
    value_per_day:
      props.value_per_day ??
      Number(faker.commerce.price({ min: 100, max: 1000 })),
    number_of_passengers:
      props.number_of_passengers ?? faker.number.int({ min: 2, max: 7 }),
    created_at: props.created_at ?? new Date(),
    updated_at: props.updated_at ?? new Date(),
  }
}

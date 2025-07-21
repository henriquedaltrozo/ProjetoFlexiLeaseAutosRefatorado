import { faker } from '@faker-js/faker'
import { ReserveModel } from '@/reserves/domain/models/reserves.model'
import { randomUUID } from 'node:crypto'

export function ReservesDataBuilder(
  props: Partial<ReserveModel>,
): ReserveModel {
  const startDate = props.start_date ?? faker.date.future()
  const endDate = props.end_date ?? faker.date.future({ refDate: startDate })

  return {
    id: props.id ?? randomUUID(),
    start_date: startDate,
    end_date: endDate,
    vehicle_id: props.vehicle_id ?? randomUUID(),
    user_id: props.user_id ?? randomUUID(),
    created_at: props.created_at ?? new Date(),
    updated_at: props.updated_at ?? new Date(),
  }
}

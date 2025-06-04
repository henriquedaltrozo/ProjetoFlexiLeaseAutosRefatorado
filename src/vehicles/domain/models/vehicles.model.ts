export interface VehicleModel {
  id: string
  model: string
  color: string
  year: number
  value_per_day: number
  number_of_passengers: number
  accessories: {
    description: string
  }[]
  created_at: Date
  updated_at: Date
}

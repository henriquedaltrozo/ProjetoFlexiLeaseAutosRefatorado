import { ReserveOutput } from './reserve-output.dto'

export type PaginationOutput<T = any> = {
  items: T[]
  total: number
  current_page: number
  per_page: number
  last_page: number
}

export type PaginationOutputMapper = {
  toOutput<T = any>(
    items: T[],
    props: {
      total: number
      current_page: number
      per_page: number
    },
  ): PaginationOutput<T>
}

export type ReservePaginationOutput = PaginationOutput<ReserveOutput>

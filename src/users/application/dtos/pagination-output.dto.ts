export type PaginationOutputDto<Item = any> = {
  items: Item[]
  total: number
  current_page: number
  per_page: number
  last_page: number
}

export class PaginationOutputMapper {
  static toOutput<Item = any>(
    items: Item[],
    props: {
      total: number
      current_page: number
      per_page: number
    },
  ): PaginationOutputDto<Item> {
    return {
      items,
      total: props.total,
      current_page: props.current_page,
      per_page: props.per_page,
      last_page: Math.ceil(props.total / props.per_page),
    }
  }
}

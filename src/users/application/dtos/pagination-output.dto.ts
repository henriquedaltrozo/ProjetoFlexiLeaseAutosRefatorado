export type PaginationOutputDto<Item = any> = {
  items: Item[]
  per_page: number
  total: number
  current_page: number
  sort: string | null
  sort_dir: string | null
  filter: string | null
}

export class PaginationOutputMapper {
  static toOutput<Item = any>(
    items: Item[],
    props: Omit<PaginationOutputDto<Item>, 'items'>,
  ): PaginationOutputDto<Item> {
    return {
      items,
      per_page: props.per_page,
      total: props.total,
      current_page: props.current_page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    }
  }
}

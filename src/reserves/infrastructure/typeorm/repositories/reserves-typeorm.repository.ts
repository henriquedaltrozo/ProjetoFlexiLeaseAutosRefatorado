import {
  CreateReserveProps,
  ReservesRepository,
} from '@/reserves/domain/repositories/reserves.repository'
import { inject, injectable } from 'tsyringe'
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm'
import { Reserve } from '../entities/reserves.entity'
import {
  SearchInput,
  SearchOutput,
} from '@/common/domain/repositories/repository.interface'
import { ReserveModel } from '@/reserves/domain/models/reserves.model'
import { NotFoundError } from '@/common/domain/errors/not-found-error'

@injectable()
export class ReservesTypeormRepository implements ReservesRepository {
  sortableFields: string[] = ['start_date', 'end_date', 'created_at']

  constructor(
    @inject('ReservesDefaultRepositoryTypeorm')
    private reservesRepository: Repository<Reserve>,
  ) {}

  async findByUser(id_user: string): Promise<ReserveModel[]> {
    return await this.reservesRepository.find({
      where: { id_user },
      order: { start_date: 'ASC' },
    })
  }

  async findByVehicle(id_vehicle: string): Promise<ReserveModel[]> {
    return await this.reservesRepository.find({
      where: { id_vehicle },
      order: { start_date: 'ASC' },
    })
  }

  async findConflictingReserve(
    id_vehicle: string,
    start_date: Date,
    end_date: Date,
  ): Promise<ReserveModel | null> {
    const reserve = await this.reservesRepository.findOne({
      where: [
        {
          id_vehicle,
          start_date: LessThanOrEqual(end_date),
          end_date: MoreThanOrEqual(start_date),
        },
      ],
    })
    return reserve
  }

  create(props: CreateReserveProps): ReserveModel {
    return this.reservesRepository.create(props)
  }

  async insert(model: ReserveModel): Promise<ReserveModel> {
    return await this.reservesRepository.save(model)
  }

  async findById(id: string): Promise<ReserveModel> {
    return this._get(id)
  }

  async update(model: ReserveModel): Promise<ReserveModel> {
    await this._get(model.id)
    await this.reservesRepository.update({ id: model.id }, model)
    return model
  }

  async delete(id: string): Promise<void> {
    await this._get(id)
    await this.reservesRepository.delete(id)
  }

  async search(props: SearchInput): Promise<SearchOutput<ReserveModel>> {
    const validSort = this.sortableFields.includes(props.sort) || false
    const dirOps = ['asc', 'desc']
    const validSortDir =
      (props.sort_dir && dirOps.includes(props.sort_dir.toLowerCase())) || false
    const orderByField = validSort ? props.sort : 'created_at'
    const orderByDir = validSortDir ? props.sort_dir : 'desc'

    const [reserves, total] = await this.reservesRepository.findAndCount({
      order: {
        [orderByField]: orderByDir,
      },
      skip: (props.page - 1) * props.per_page,
      take: props.per_page,
    })

    return {
      items: reserves,
      per_page: props.per_page,
      total,
      current_page: props.page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    }
  }

  protected async _get(id: string): Promise<ReserveModel> {
    const reserve = await this.reservesRepository.findOneBy({ id })
    if (!reserve) {
      throw new NotFoundError(`Reserve not found using ID ${id}`)
    }
    return reserve
  }
}

import {
  SearchInput,
  SearchOutput,
} from '@/common/domain/repositories/repository.interface'
import { VehicleModel } from '@/vehicles/domain/models/vehicles.model'
import {
  CreateVehicleProps,
  VehicleId,
  VehiclesRepository,
} from '@/vehicles/domain/repositories/vehicles.repository'
import { ILike, In, Repository } from 'typeorm'
import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { inject, injectable } from 'tsyringe'
import { Vehicle } from '../entities/vehicles.entity'

@injectable()
export class VehiclesTypeOrmRepository implements VehiclesRepository {
  sortableFields: string[] = ['name', 'created_at']

  constructor(
    @inject('VehiclesDefaultTypeormRepository')
    private vehiclesRepository: Repository<Vehicle>,
  ) {}

  async findByName(name: string): Promise<VehicleModel> {
    const vehicle = await this.vehiclesRepository.findOneBy({ name })
    if (!vehicle) {
      throw new NotFoundError(`Vehicle not found using name ${name}`)
    }
    return vehicle
  }

  async findAllByIds(vehicleIds: VehicleId[]): Promise<VehicleModel[]> {
    const ids = vehicleIds.map(vehicleId => vehicleId.id)
    const productsFound = await this.vehiclesRepository.find({
      where: { id: In(ids) },
    })
    return productsFound
  }

  create(props: CreateVehicleProps): VehicleModel {
    return this.vehiclesRepository.create(props)
  }

  async insert(model: VehicleModel): Promise<VehicleModel> {
    return this.vehiclesRepository.save(model)
  }

  findById(id: string): Promise<VehicleModel> {
    return this._get(id)
  }

  async update(model: VehicleModel): Promise<VehicleModel> {
    await this._get(model.id)
    await this.vehiclesRepository.update({ id: model.id }, model)
    return model
  }

  async delete(id: string): Promise<void> {
    await this._get(id)
    await this.vehiclesRepository.delete({ id })
  }

  async search(props: SearchInput): Promise<SearchOutput<VehicleModel>> {
    const validSort = this.sortableFields.includes(props.sort) || false
    const dirOps = ['asc', 'desc']
    const validSortDir =
      (props.sort_dir && dirOps.includes(props.sort_dir.toLowerCase())) || false
    const orderByField = validSort ? props.sort : 'created_at'
    const orderByDir = validSortDir ? props.sort_dir : 'desc'

    const [vehicles, total] = await this.vehiclesRepository.findAndCount({
      ...(props.filter && { where: { name: ILike(`%${props.filter}%`) } }),
      order: { [orderByField]: orderByDir },
      skip: (props.page - 1) * props.per_page,
      take: props.per_page,
    })

    return {
      items: vehicles,
      per_page: props.per_page,
      total,
      current_page: props.page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    }
  }

  protected async _get(id: string): Promise<VehicleModel> {
    const vehicle = await this.vehiclesRepository.findOneBy({ id })
    if (!vehicle) {
      throw new Error(`Vehicle not found using ID ${id}`)
    }
    return vehicle
  }
}

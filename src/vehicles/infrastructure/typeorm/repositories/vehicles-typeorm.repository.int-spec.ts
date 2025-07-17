import { testDataSource } from '@/common/infrastructure/typeorm/testing/data-source'
import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { randomUUID } from 'crypto'
import { VehiclesTypeOrmRepository } from './vehicles-typeorm.repository'
import { Vehicle } from '../entities/vehicles.entity'
import { VehiclesDataBuilder } from '../../testing/helpers/vehicles-data-builder'
import { VehicleModel } from '@/vehicles/domain/models/vehicles.model'

describe('VehiclesTypeormRepository integration tests', () => {
  let ormRepository: VehiclesTypeOrmRepository
  let typeormEntityManager: any

  const cleanDatabase = async () => {
    try {
      await testDataSource.manager.query('DELETE FROM reserves')
    } catch (error) {
      console.warn('Failed to delete reserves:', error)
    }
    try {
      await testDataSource.manager.query('DELETE FROM vehicles')
    } catch (error) {
      console.warn('Failed to delete vehicles:', error)
    }
    try {
      await testDataSource.manager.query('DELETE FROM users')
    } catch (error) {
      console.warn('Failed to delete users:', error)
    }
  }

  beforeAll(async () => {
    await testDataSource.initialize()
    typeormEntityManager = testDataSource.createEntityManager()
    await cleanDatabase()
  })

  afterAll(async () => {
    await cleanDatabase()
    await testDataSource.destroy()
  })

  beforeEach(async () => {
    await cleanDatabase()
    ormRepository = new VehiclesTypeOrmRepository(
      typeormEntityManager.getRepository(Vehicle),
    )
  })

  afterEach(async () => {
    await cleanDatabase()
  })

  describe('findById', () => {
    it('should generate an error when the vehicle is not found', async () => {
      const id = randomUUID()
      await expect(ormRepository.findById(id)).rejects.toThrow(
        new NotFoundError(`Vehicle not found using ID ${id}`),
      )
    })

    it('should finds a vehicle by id', async () => {
      const data = VehiclesDataBuilder({})
      const vehicle = testDataSource.manager.create(Vehicle, data)
      await testDataSource.manager.save(vehicle)

      const result = await ormRepository.findById(vehicle.id)
      expect(result.id).toEqual(vehicle.id)
      expect(result.name).toEqual(vehicle.name)
    })
  })

  describe('create', () => {
    it('should create a new vehicle object', () => {
      const data = VehiclesDataBuilder({ name: 'Vehicle 1' })
      const result = ormRepository.create(data)
      expect(result.name).toEqual(data.name)
    })
  })

  describe('insert', () => {
    it('should insert a new vehicle', async () => {
      const data = VehiclesDataBuilder({ name: 'Vehicle 1' })
      const result = await ormRepository.insert(data)
      expect(result.name).toEqual(data.name)
    })
  })

  describe('update', () => {
    it('should generate an error when the vehicle is not found', async () => {
      const data = VehiclesDataBuilder({})
      await expect(ormRepository.update(data)).rejects.toThrow(
        new NotFoundError(`Vehicle not found using ID ${data.id}`),
      )
    })

    it('should update a vehicle', async () => {
      const data = VehiclesDataBuilder({})
      const vehicle = testDataSource.manager.create(Vehicle, data)
      await testDataSource.manager.save(vehicle)
      vehicle.name = 'nome atualizado'

      const result = await ormRepository.update(vehicle)
      expect(result.name).toEqual('nome atualizado')
    })
  })

  describe('delete', () => {
    it('should generate an error when the vehicle is not found', async () => {
      const id = randomUUID()
      await expect(ormRepository.delete(id)).rejects.toThrow(
        new NotFoundError(`Vehicle not found using ID ${id}`),
      )
    })

    it('should update a vehicle', async () => {
      const data = VehiclesDataBuilder({})
      const vehicle = testDataSource.manager.create(Vehicle, data)
      await testDataSource.manager.save(vehicle)

      await ormRepository.delete(data.id)

      const result = await testDataSource.manager.findOneBy(Vehicle, {
        id: data.id,
      })
      expect(result).toBeNull()
    })
  })

  describe('findByName', () => {
    it('should generate an error when the vehicle is not found', async () => {
      const name = 'Vehicle 1'
      await expect(ormRepository.findByName(name)).rejects.toThrow(
        new NotFoundError(`Vehicle not found using name ${name}`),
      )
    })

    it('should finds a vehicle by name', async () => {
      const data = VehiclesDataBuilder({ name: 'Vehicle 1' })
      const vehicle = testDataSource.manager.create(Vehicle, data)
      await testDataSource.manager.save(vehicle)

      const result = await ormRepository.findByName(data.name)
      expect(result.name).toEqual('Vehicle 1')
    })
  })

  describe('findAllByIds', () => {
    it('should return an empty array when not find the vehicles', async () => {
      const vehiclesIds = [
        { id: 'e0b242a9-9606-4b25-ad24-8e6e2207ae45' },
        { id: randomUUID() },
      ]
      const result = await ormRepository.findAllByIds(vehiclesIds)
      expect(result).toEqual([])
      expect(result).toHaveLength(0)
    })

    it('should find the vehicles by the id field', async () => {
      const vehiclesIds = [
        { id: 'e0b242a9-9606-4b25-ad24-8e6e2207ae45' },
        { id: randomUUID() },
      ]

      const data = VehiclesDataBuilder({ id: vehiclesIds[0].id })
      const product = testDataSource.manager.create(Vehicle, data)
      await testDataSource.manager.save(product)

      const result = await ormRepository.findAllByIds(vehiclesIds)
      expect(result).toHaveLength(1)
    })
  })

  describe('search', () => {
    it('should apply only pagination when the other params are null', async () => {
      const arrange = Array(16).fill(VehiclesDataBuilder({}))
      arrange.map(element => delete element.id)
      const data = testDataSource.manager.create(Vehicle, arrange)
      await testDataSource.manager.save(data)

      const result = await ormRepository.search({
        page: 1,
        per_page: 15,
        sort: null,
        sort_dir: null,
        filter: null,
      })

      expect(result.total).toEqual(16)
      expect(result.items.length).toEqual(15)
    })

    it('should order by created_at DESC when search params are null', async () => {
      const created_at = new Date()
      const models: VehicleModel[] = []
      const arrange = Array(16).fill(VehiclesDataBuilder({}))
      arrange.forEach((element, index) => {
        delete element.id
        models.push({
          ...element,
          name: `Vehicle ${index}`,
          created_at: new Date(created_at.getTime() + index),
        })
      })
      const data = testDataSource.manager.create(Vehicle, models)
      await testDataSource.manager.save(data)

      const result = await ormRepository.search({
        page: 1,
        per_page: 15,
        sort: null,
        sort_dir: null,
        filter: null,
      })

      expect(result.items[0].name).toEqual('Vehicle 15')
      expect(result.items[14].name).toEqual('Vehicle 1')
    })

    it('should apply paginate and sort', async () => {
      const created_at = new Date()
      const models: VehicleModel[] = []
      'badec'.split('').forEach((element, index) => {
        models.push({
          ...VehiclesDataBuilder({}),
          name: element,
          created_at: new Date(created_at.getTime() + index),
        })
      })
      const data = testDataSource.manager.create(Vehicle, models)
      await testDataSource.manager.save(data)

      let result = await ormRepository.search({
        page: 1,
        per_page: 2,
        sort: 'name',
        sort_dir: 'ASC',
        filter: null,
      })

      expect(result.items[0].name).toEqual('a')
      expect(result.items[1].name).toEqual('b')
      expect(result.items.length).toEqual(2)

      result = await ormRepository.search({
        page: 1,
        per_page: 2,
        sort: 'name',
        sort_dir: 'DESC',
        filter: null,
      })

      expect(result.items[0].name).toEqual('e')
      expect(result.items[1].name).toEqual('d')
      expect(result.items.length).toEqual(2)
    })

    it('should search using filter, sort and paginate', async () => {
      const created_at = new Date()
      const models: VehicleModel[] = []
      const values = ['test', 'a', 'TEST', 'b', 'TeSt']
      values.forEach((element, index) => {
        models.push({
          ...VehiclesDataBuilder({}),
          name: element,
          created_at: new Date(created_at.getTime() + index),
        })
      })
      const data = testDataSource.manager.create(Vehicle, models)
      await testDataSource.manager.save(data)

      let result = await ormRepository.search({
        page: 1,
        per_page: 2,
        sort: 'name',
        sort_dir: 'ASC',
        filter: 'TEST',
      })

      expect(result.items[0].name).toEqual('test')
      expect(result.items[1].name).toEqual('TeSt')
      expect(result.items.length).toEqual(2)
      expect(result.total).toEqual(3)

      result = await ormRepository.search({
        page: 2,
        per_page: 2,
        sort: 'name',
        sort_dir: 'ASC',
        filter: 'TEST',
      })

      expect(result.items[0].name).toEqual('TEST')
      expect(result.items.length).toEqual(1)
      expect(result.total).toEqual(3)
    })
  })
})

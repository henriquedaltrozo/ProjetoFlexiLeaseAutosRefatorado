import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { VehiclesDataBuilder } from '../../testing/helpers/vehicles-data-builder'
import { VehiclesInMemoryRepository } from './vehicles-in-memory.repository'

describe('VehiclesInMemoryRepository unit tests', () => {
  let sut: VehiclesInMemoryRepository

  beforeEach(() => {
    sut = new VehiclesInMemoryRepository()
  })

  describe('findByName', () => {
    it('should throw error when vehicle not found', async () => {
      await expect(() => sut.findByName('fake_name')).rejects.toThrow(
        new NotFoundError('Vehicle with name fake_name not found'),
      )
      await expect(() => sut.findByName('fake_name')).rejects.toBeInstanceOf(
        NotFoundError,
      )
    })

    it('should find a vehicle by name', async () => {
      const data = VehiclesDataBuilder({ name: 'Voyage' })
      sut.items.push(data)
      const result = await sut.findByName('Voyage')
      expect(result).toStrictEqual(data)
    })
  })

  describe('applyFilter', () => {
    it('should no filter items when filter param is null', async () => {
      const data = VehiclesDataBuilder({})
      sut.items.push(data)
      const spyFilterMethod = jest.spyOn(sut.items, 'filter' as any)
      const result = await sut['applyFilter'](sut.items, null)
      expect(spyFilterMethod).not.toHaveBeenCalled()
      expect(result).toStrictEqual(sut.items)
    })

    it('should filter the data using filter param', async () => {
      const items = [
        VehiclesDataBuilder({ name: 'Test' }),
        VehiclesDataBuilder({ name: 'TEST' }),
        VehiclesDataBuilder({ name: 'fake' }),
      ]
      sut.items.push(...items)
      const spyFilterMethod = jest.spyOn(sut.items, 'filter' as any)
      const result = await sut['applyFilter'](sut.items, 'TEST')
      expect(spyFilterMethod).toHaveBeenCalledTimes(1)
      expect(result).toStrictEqual([items[0], items[1]])
    })
  })

  describe('applySort', () => {
    it('should sort items by created_at when sort param is null', async () => {
      const created_at = new Date()
      const items = [
        VehiclesDataBuilder({ name: 'c', created_at: created_at }),
        VehiclesDataBuilder({
          name: 'a',
          created_at: new Date(created_at.getTime() + 100),
        }),
        VehiclesDataBuilder({
          name: 'b',
          created_at: new Date(created_at.getTime() + 200),
        }),
      ]
      sut.items.push(...items)
      const result = await sut['applySort'](sut.items, null, null)
      expect(result).toStrictEqual([items[2], items[1], items[0]])
    })

    it('should sort items by name field', async () => {
      const items = [
        VehiclesDataBuilder({ name: 'c' }),
        VehiclesDataBuilder({ name: 'a' }),
        VehiclesDataBuilder({ name: 'b' }),
      ]
      sut.items.push(...items)
      const result = await sut['applySort'](sut.items, 'name', 'desc')
      expect(result).toStrictEqual([items[0], items[2], items[1]])
    })
  })
})

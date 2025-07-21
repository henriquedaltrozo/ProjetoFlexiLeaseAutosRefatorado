import { ReservesDataBuilder } from '../../testing/reserves-data-builder'
import { ReservesInMemoryRepository } from './reserves-in-memory.repository'

describe('ReservesInMemoryRepository unit tests', () => {
  let sut: ReservesInMemoryRepository

  beforeEach(() => {
    sut = new ReservesInMemoryRepository()
  })

  describe('findByUser', () => {
    it('should return empty array when no reserves found for user', async () => {
      const result = await sut.findByUser('fake_user_id')
      expect(result).toStrictEqual([])
    })

    it('should find all reserves by user id', async () => {
      const userId = 'user123'
      const userReserves = [
        ReservesDataBuilder({ user_id: userId }),
        ReservesDataBuilder({ user_id: userId }),
      ]
      const otherReserve = ReservesDataBuilder({ user_id: 'other_user' })

      sut.items.push(...userReserves, otherReserve)

      const result = await sut.findByUser(userId)
      expect(result).toHaveLength(2)
      expect(result).toStrictEqual(userReserves)
    })
  })

  describe('findByVehicle', () => {
    it('should return empty array when no reserves found for vehicle', async () => {
      const result = await sut.findByVehicle('fake_vehicle_id')
      expect(result).toStrictEqual([])
    })

    it('should find all reserves by vehicle id', async () => {
      const vehicleId = 'vehicle123'
      const vehicleReserves = [
        ReservesDataBuilder({ vehicle_id: vehicleId }),
        ReservesDataBuilder({ vehicle_id: vehicleId }),
      ]
      const otherReserve = ReservesDataBuilder({ vehicle_id: 'other_vehicle' })

      sut.items.push(...vehicleReserves, otherReserve)

      const result = await sut.findByVehicle(vehicleId)
      expect(result).toHaveLength(2)
      expect(result).toStrictEqual(vehicleReserves)
    })
  })

  describe('findConflictingReserve', () => {
    it('should return null when no conflicting reserve found', async () => {
      const vehicleId = 'vehicle123'
      const startDate = new Date('2024-01-01')
      const endDate = new Date('2024-01-05')

      // Reserve for different vehicle
      const otherVehicleReserve = ReservesDataBuilder({
        vehicle_id: 'other_vehicle',
        start_date: new Date('2024-01-02'),
        end_date: new Date('2024-01-04'),
      })

      // Reserve for same vehicle but different dates
      const sameVehicleReserve = ReservesDataBuilder({
        vehicle_id: vehicleId,
        start_date: new Date('2024-01-10'),
        end_date: new Date('2024-01-15'),
      })

      sut.items.push(otherVehicleReserve, sameVehicleReserve)

      const result = await sut.findConflictingReserve(
        vehicleId,
        startDate,
        endDate,
      )
      expect(result).toBeNull()
    })

    it('should find conflicting reserve when new reserve starts within existing reserve', async () => {
      const vehicleId = 'vehicle123'
      const existingReserve = ReservesDataBuilder({
        vehicle_id: vehicleId,
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-01-10'),
      })

      sut.items.push(existingReserve)

      const result = await sut.findConflictingReserve(
        vehicleId,
        new Date('2024-01-05'),
        new Date('2024-01-15'),
      )
      expect(result).toStrictEqual(existingReserve)
    })

    it('should find conflicting reserve when new reserve ends within existing reserve', async () => {
      const vehicleId = 'vehicle123'
      const existingReserve = ReservesDataBuilder({
        vehicle_id: vehicleId,
        start_date: new Date('2024-01-05'),
        end_date: new Date('2024-01-15'),
      })

      sut.items.push(existingReserve)

      const result = await sut.findConflictingReserve(
        vehicleId,
        new Date('2024-01-01'),
        new Date('2024-01-10'),
      )
      expect(result).toStrictEqual(existingReserve)
    })

    it('should find conflicting reserve when new reserve encompasses existing reserve', async () => {
      const vehicleId = 'vehicle123'
      const existingReserve = ReservesDataBuilder({
        vehicle_id: vehicleId,
        start_date: new Date('2024-01-05'),
        end_date: new Date('2024-01-10'),
      })

      sut.items.push(existingReserve)

      const result = await sut.findConflictingReserve(
        vehicleId,
        new Date('2024-01-01'),
        new Date('2024-01-15'),
      )
      expect(result).toStrictEqual(existingReserve)
    })

    it('should find conflicting reserve when new reserve is within existing reserve', async () => {
      const vehicleId = 'vehicle123'
      const existingReserve = ReservesDataBuilder({
        vehicle_id: vehicleId,
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-01-15'),
      })

      sut.items.push(existingReserve)

      const result = await sut.findConflictingReserve(
        vehicleId,
        new Date('2024-01-05'),
        new Date('2024-01-10'),
      )
      expect(result).toStrictEqual(existingReserve)
    })
  })

  describe('applyFilter', () => {
    it('should no filter items when filter param is null', async () => {
      const data = ReservesDataBuilder({})
      sut.items.push(data)
      const spyFilterMethod = jest.spyOn(sut.items, 'filter' as any)
      const result = await sut['applyFilter'](sut.items, null)
      expect(spyFilterMethod).not.toHaveBeenCalled()
      expect(result).toStrictEqual(sut.items)
    })

    it('should filter the data using user_id filter param', async () => {
      const items = [
        ReservesDataBuilder({ user_id: 'user123' }),
        ReservesDataBuilder({ user_id: 'USER123' }),
        ReservesDataBuilder({ user_id: 'other_user' }),
      ]
      sut.items.push(...items)
      const spyFilterMethod = jest.spyOn(sut.items, 'filter' as any)
      const result = await sut['applyFilter'](sut.items, '123')
      expect(spyFilterMethod).toHaveBeenCalledTimes(1)
      expect(result).toStrictEqual([items[0], items[1]])
    })

    it('should filter the data using vehicle_id filter param', async () => {
      const items = [
        ReservesDataBuilder({ vehicle_id: 'vehicle123' }),
        ReservesDataBuilder({ vehicle_id: 'VEHICLE123' }),
        ReservesDataBuilder({ vehicle_id: 'other_vehicle' }),
      ]
      sut.items.push(...items)
      const spyFilterMethod = jest.spyOn(sut.items, 'filter' as any)
      const result = await sut['applyFilter'](sut.items, '123')
      expect(spyFilterMethod).toHaveBeenCalledTimes(1)
      expect(result).toStrictEqual([items[0], items[1]])
    })
  })

  describe('applySort', () => {
    it('should sort items by created_at when sort param is null', async () => {
      const created_at = new Date()
      const items = [
        ReservesDataBuilder({ created_at: created_at }),
        ReservesDataBuilder({
          created_at: new Date(created_at.getTime() + 100),
        }),
        ReservesDataBuilder({
          created_at: new Date(created_at.getTime() + 200),
        }),
      ]
      sut.items.push(...items)
      const result = await sut['applySort'](sut.items, null, null)
      expect(result).toStrictEqual([items[2], items[1], items[0]])
    })

    it('should sort items by start_date field', async () => {
      const items = [
        ReservesDataBuilder({ start_date: new Date('2024-01-03') }),
        ReservesDataBuilder({ start_date: new Date('2024-01-01') }),
        ReservesDataBuilder({ start_date: new Date('2024-01-02') }),
      ]
      sut.items.push(...items)
      const result = await sut['applySort'](sut.items, 'start_date', 'asc')
      expect(result).toStrictEqual([items[1], items[2], items[0]])
    })

    it('should sort items by end_date field', async () => {
      const items = [
        ReservesDataBuilder({ end_date: new Date('2024-01-15') }),
        ReservesDataBuilder({ end_date: new Date('2024-01-10') }),
        ReservesDataBuilder({ end_date: new Date('2024-01-20') }),
      ]
      sut.items.push(...items)
      const result = await sut['applySort'](sut.items, 'end_date', 'desc')
      expect(result).toStrictEqual([items[2], items[0], items[1]])
    })
  })
})

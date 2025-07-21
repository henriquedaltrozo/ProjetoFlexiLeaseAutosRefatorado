import { ConflictError } from '@/common/domain/errors/conflict-error'
import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { UsersDataBuilder } from '../../testing/helpers/users-data-builder'
import { UsersInMemoryRepository } from './users-in-memory.repository'

describe('UsersInMemoryRepository unit tests', () => {
  let sut: UsersInMemoryRepository

  beforeEach(() => {
    sut = new UsersInMemoryRepository()
  })

  describe('findByEmail', () => {
    it('should throw error when user not found', async () => {
      await expect(() =>
        sut.findByEmail('fake_email@test.com'),
      ).rejects.toThrow(
        new NotFoundError('User not found with the provided email'),
      )
      await expect(() =>
        sut.findByEmail('fake_email@test.com'),
      ).rejects.toBeInstanceOf(NotFoundError)
    })

    it('should find a user by email', async () => {
      const data = UsersDataBuilder({ email: 'test@example.com' })
      sut.items.push(data)
      const result = await sut.findByEmail('test@example.com')
      expect(result).toStrictEqual(data)
    })
  })

  describe('findByName', () => {
    it('should throw error when user not found', async () => {
      await expect(() => sut.findByName('fake_name')).rejects.toThrow(
        new NotFoundError('User not found using name fake_name'),
      )
      await expect(() => sut.findByName('fake_name')).rejects.toBeInstanceOf(
        NotFoundError,
      )
    })

    it('should find a user by name', async () => {
      const data = UsersDataBuilder({ name: 'John Doe' })
      sut.items.push(data)
      const result = await sut.findByName('John Doe')
      expect(result).toStrictEqual(data)
    })
  })

  describe('conflictingEmail', () => {
    it('should throw error when email already exists', async () => {
      const data = UsersDataBuilder({ email: 'test@example.com' })
      sut.items.push(data)
      await expect(() =>
        sut.conflictingEmail('test@example.com'),
      ).rejects.toThrow(new ConflictError('Email already in use'))
      await expect(() =>
        sut.conflictingEmail('test@example.com'),
      ).rejects.toBeInstanceOf(ConflictError)
    })

    it('should not throw error when email does not exist', async () => {
      await expect(
        sut.conflictingEmail('new@example.com'),
      ).resolves.toBeUndefined()
    })
  })

  describe('applyFilter', () => {
    it('should no filter items when filter param is null', async () => {
      const data = UsersDataBuilder({})
      sut.items.push(data)
      const spyFilterMethod = jest.spyOn(sut.items, 'filter' as any)
      const result = await sut['applyFilter'](sut.items, null)
      expect(spyFilterMethod).not.toHaveBeenCalled()
      expect(result).toStrictEqual(sut.items)
    })

    it('should filter the data using filter param', async () => {
      const items = [
        UsersDataBuilder({ name: 'John Test' }),
        UsersDataBuilder({ name: 'Jane TEST' }),
        UsersDataBuilder({ name: 'Bob Fake' }),
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
        UsersDataBuilder({ name: 'c', created_at: created_at }),
        UsersDataBuilder({
          name: 'a',
          created_at: new Date(created_at.getTime() + 100),
        }),
        UsersDataBuilder({
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
        UsersDataBuilder({ name: 'Charlie' }),
        UsersDataBuilder({ name: 'Alice' }),
        UsersDataBuilder({ name: 'Bob' }),
      ]
      sut.items.push(...items)
      const result = await sut['applySort'](sut.items, 'name', 'desc')
      expect(result).toStrictEqual([items[0], items[2], items[1]])
    })

    it('should sort items by email field', async () => {
      const items = [
        UsersDataBuilder({ email: 'charlie@test.com' }),
        UsersDataBuilder({ email: 'alice@test.com' }),
        UsersDataBuilder({ email: 'bob@test.com' }),
      ]
      sut.items.push(...items)
      const result = await sut['applySort'](sut.items, 'email', 'asc')
      expect(result).toStrictEqual([items[1], items[2], items[0]])
    })
  })
})

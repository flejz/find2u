import { Characteristics } from '.'
import { User } from '../user'

let user, characteristics

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  characteristics = await Characteristics.create({ user, reference_id: 'test', type: 'test', which: 'test', description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = characteristics.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(characteristics.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.reference_id).toBe(characteristics.reference_id)
    expect(view.type).toBe(characteristics.type)
    expect(view.which).toBe(characteristics.which)
    expect(view.description).toBe(characteristics.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = characteristics.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(characteristics.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.reference_id).toBe(characteristics.reference_id)
    expect(view.type).toBe(characteristics.type)
    expect(view.which).toBe(characteristics.which)
    expect(view.description).toBe(characteristics.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

import { Disappeared } from '.'
import { User } from '../user'

let user, disappeared

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  disappeared = await Disappeared.create({ user, name: 'test', birth_date: 'test', disappearance_date: 'test', mobile_contact: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = disappeared.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(disappeared.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(disappeared.name)
    expect(view.birth_date).toBe(disappeared.birth_date)
    expect(view.disappearance_date).toBe(disappeared.disappearance_date)
    expect(view.mobile_contact).toBe(disappeared.mobile_contact)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = disappeared.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(disappeared.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(disappeared.name)
    expect(view.birth_date).toBe(disappeared.birth_date)
    expect(view.disappearance_date).toBe(disappeared.disappearance_date)
    expect(view.mobile_contact).toBe(disappeared.mobile_contact)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

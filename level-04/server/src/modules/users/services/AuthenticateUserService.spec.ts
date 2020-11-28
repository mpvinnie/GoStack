import FakeUsersRepository from '../repositories/fakes/FakeUsersREpository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let authenticateUser: AuthenticateUserService
let createUser: CreateUserService

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
  })

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })
})

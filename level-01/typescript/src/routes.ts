import { Request, Response } from 'express'
import createUser from './services/CreateUser'

export function helloWorld(request: Request, response: Response): Response {
  const user = createUser({
    email: 'vinnie@gmail.com',
    password: '123456',
    techs: [
      'Node.JS',
      'React JS',
      'React Native',
      { title: 'Javascript', experience: 100 }
    ]
  })

  return response.json({ message: 'Hello World' })
}
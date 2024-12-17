import DBLocal from 'db-local'
import { z } from 'zod'
const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

const userSchema = z.object({
  username: z.string()
    .min(3, 'username must be at least 3 characters long'),
  password: z.string()
    .min(6, 'password must be at least 6 characters long')
})

export class UserRepository {
  static async create ({ username, password }) {
    // Validacion
    const parsedData = userSchema.parse({ username, password })

    // Verificacion de la existencia del usuario
    const existingUser = await User.findOne({ username: parsedData.username })
    if (existingUser) {
      throw new Error('username already exists')
    }
    const id = crypto.randomUUID()

    // Crear el usuario en la DB local
    await User.create({
      id,
      username: parsedData.username,
      password: parsedData.password
    }).save()
    console.log('User created successfully')
  }

  static async login ({ username, password }) {
    // Validacion
    userSchema.parse({ username, password })

    // Buscar el usuario por username
    const user = await User.findOne({ username })
    if (!user) {
      throw new Error('User not found')
    }
    // Validacion de password
    if (user.password !== password) {
      throw new Error('Invalid password')
    }
    console.log('Login successful')

    return user
  }
}

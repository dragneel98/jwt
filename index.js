import express from 'express'
import { UserRepository } from './db/user-respository.js'

const app = express()
const port = process.env.PORT ?? 3000
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello gg !')
})

app.post('/login', (req, res) => {
  const {username, password} = req.body
  try {
    const id = UserRepository.create({username, password})
    res.send({id})
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.post('/register', (req, res) => {
  const {username, password} = req.body
  try {
    const id = UserRepository.create({username, password})
    console.log("gg");
    res.send({id})
  } catch (error) {
    res.status(400).send(error.message)
  }
})
app.post('/logout', (req, res) => {
  res.send('POST request to the homepage')
})
app.get('/protegida', (req, res) => {
  res.send('POST request to the homepage')
})
app.listen(port, () => console.log(`server listening on port http://localhost:${port}`))

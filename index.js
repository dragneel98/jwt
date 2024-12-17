import express from 'express'
const app = express()
const port = process.env.PORT ?? 3000

app.get('/', (req, res) => {
  res.send('Hello !')
})
app.post('/login', (req, res) => {
  res.json({ user: 'dragneel' })
})
app.post('/register', (req, res) => {
  res.send('POST request to the homepage')
})
app.post('/logout', (req, res) => {
  res.send('POST request to the homepage')
})
app.get('/protegida', (req, res) => {
  res.send('POST request to the homepage')
})
app.listen(port, () => console.log(`server listening on port http://localhost:${port}`))

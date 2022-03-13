const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const DB = require('./services/DB')
const app = express()
const PORT = process.env.PORT || 3001

morgan.token('body', function (req, res) {
  return [JSON.stringify(req.body)]
})

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('build'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') return response.status(400).send({ error: ' id' })
  if (error.name === 'ValidationError') return response.status(400).json({ error: error.message })
  next(error)
}

app.get('/', (request, response) => {
  response.status(200).send('Server is running.').end()
})

app.get('/api/persons', (request, response, next) => {
  DB.find({})
    .then(result => response.json(result).end())
    .catch(error => errorHandler(error, request, response, next))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!body.name || !body.number) return response.status(406).json({ error: 'The name or number is missing' }).end()
  DB.findOne({ name: body.name })
    .then(result => {
      if (result) return response.status(306).json({ error: 'The name already exists in the phonebook' }).end()
      const person = new DB(body)
      person.save(body)
        .then(result => response.json(result).end())
        .catch(error => errorHandler(error, request, response, next))
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  DB.findById(id)
    .then(result => response.json(result).end())
    .catch(error => errorHandler(error, request, response, next))
})

app.get('/info', (request, response, next) => {
  DB.find({})
    .then(result => {
      const info = `<p>Phonebook has info for ${result.length} people.</p><p>${new Date().toUTCString()}</p>`
      response.status(200).send(info).end()
    })
    .catch(error => errorHandler(error, request, response, next))
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  DB.findByIdAndUpdate(id, request.body)
    .then(result => response.status(200).send(result).end())
    .catch(error => errorHandler(error, request, response, next))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  DB.findByIdAndDelete(id)
    .then(result => response.status(200).send(result).end())
    .catch(error => errorHandler(error, request, response, next))
})

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})

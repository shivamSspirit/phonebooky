
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())

app.use(express.json())

app.use(morgan('tiny'))

let persons = 
    [
        {
          id: 1,
          name: "shivam",
          number:34535435,
          date: "2019-05-30T17:30:31.098Z",
          
        },
        {
          id: 2,
          name: "shivamji",
          number:34535435,
          date: "2019-05-30T18:39:34.091Z",
         
        },
        {
          id: 3,
          name: "shivaji",
          number:34535435,
          date: "2019-05-30T19:20:14.298Z",
         
        }
      ]


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info',(request,response)=>{
  response.send(
    `
    <h3>phonebook has info for ${persons.length} people</h3>
    <p>${new Date()} </p>
    `
  )
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(note => note.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
 
})


app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})

const generateId = () => { return Math.floor(Math.random()*100) }



app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name||!body.number) {
    return response.status(400).json({ 
      error: 'person missing' 
    })
  }
else if(persons.find(val=>val.name===body.name)){
  return response.status(400).json({
    error:'name must be unique'
  })

}
  const person = {
    id: generateId(),
    name: body.name,
   number:body.number,
    date: new Date(),
   
  }

  persons = persons.concat(person)

  response.json(person)
})
const PORT= process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
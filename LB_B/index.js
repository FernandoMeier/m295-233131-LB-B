/* eslint-disable eqeqeq */
const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

let tasks = [
  {
    id: 1,
    content: 'Feed the dog',
    finished: false,
    createdate: new Date(),
    finishdate: undefined
  },
  {
    id: 2,
    content: 'Feed the duck',
    finished: false,
    createdate: new Date(),
    finishdate: undefined
  }
]

function idCheck (id) {
  const found = tasks.filter((t) => t.id == id)
  if (found[0]) {
    return true
  } else {
    return false
  }
}

app.get('/', (req, res) => {
  res.send('Welcome')
})

app.get('/tasks', (req, res) => {
  // Endpunkt, welcher eine Liste aller Tasks zurück gibt.
  res.send(tasks).status(200)
})

app.get('/tasks/:id', (req, res) => {
  // Endpunkt, welcher einen einzelnen Task zurück gibt.
  const id = req.params.id
  if (idCheck(id)) {
    const found = tasks.filter((t) => t.id == id)

    res.status(200).send(found)
  } else {
    res.status(404).json('Task not found')
  }
})

app.post('/tasks', (req, res) => {
  // Endpunkt, welcher einen neuen Task erstellt und diesen zurück gibt.
  const id = tasks[tasks.length - 1].id + 1
  const newTask = {
    id,
    content: 'Empty task',
    finished: false,
    createdate: new Date(),
    finishdate: undefined
  }

  tasks = [...tasks, newTask]
  res.status(201).send(newTask)
})

app.put('/tasks/:id', (req, res) => {
  // Endpunkt, welcher bestehend Task verändert und diesen zurück gibt.
  if (idCheck(req.params.id)) {
    if (req.params.id && req.query.content && req.query.finished) {
      let date
      const createdate = tasks.filter((t) => t.id == req.params.id)[0].createdate
      if ((req.query.finished) == 'true') { date = new Date() }
      const updatedTask = {
        id: parseInt(req.params.id),
        content: req.query.content,
        createdate,
        finished: req.query.finished,
        finishdate: date
      }

      tasks = tasks.map((t) => t.id == updatedTask.id ? updatedTask : t)

      res.status(201).send(updatedTask)
    } else {
      res.sendStatus(422)
    }
  } else {
    res.status(404).json('Task not found')
  }
})

app.delete('/tasks/:id', (req, res) => {
  // Endpunkt, welcher bestehend Task aus der Liste löscht.
  const id = req.params.id
  if (idCheck(id)) {
    const deleted = tasks.filter((t) => t.id == id)
    tasks = tasks.filter((t) => t.id != id)

    res.status(200).send(deleted)
  } else {
    res.status(404).json('Task not found')
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

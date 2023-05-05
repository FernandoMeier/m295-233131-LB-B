/* eslint-disable space-before-function-paren */
/* eslint-disable eqeqeq */
const express = require('express')
const session = require('express-session')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(session({
  name: 'new-session',
  secret: 'megascecretthingy',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

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

// check if id exists by searching all tasks
function idCheck(id) {
  const found = tasks.filter((t) => t.id == id)
  if (found[0]) {
    return true
  } else {
    return false
  }
}

// verify if the cookie is valid by checking for mail
function cookieValid(req) {
  if (req.session.email) {
    return true
  } else {
    return false
  }
}

app.get('/', (req, res) => {
  if (cookieValid(req)) {
    res.send('Welcome')
  } else {
    res.status(403).json('Access denied, you are not logged in')
  }
})

// ------------------------ Hauptanforderungen: ------------------------

app.get('/tasks', (req, res) => {
  // Endpunkt, welcher eine Liste aller Tasks zurück gibt.

  if (cookieValid(req)) {
    res.status(200).send(tasks)
  } else {
    res.status(403).json('Access denied, you are not logged in')
  }
})

app.get('/tasks/:id', (req, res) => {
  // Endpunkt, welcher einen einzelnen Task zurück gibt.

  if (cookieValid(req)) {
    const id = req.params.id
    if (idCheck(id)) {
      const found = tasks.filter((t) => t.id == id)

      res.status(200).send(found)
    } else {
      res.status(404).json('Task not found')
    }
  } else {
    res.status(403).json('Access denied, you are not logged in')
  }
})

app.post('/tasks', (req, res) => {
  // Endpunkt, welcher einen neuen Task erstellt und diesen zurück gibt.

  if (cookieValid(req)) {
    const id = tasks[tasks.length - 1].id + 1
    const { content } = req.body
    const newTask = {
      id,
      content: content || 'Empty task',
      finished: false,
      createdate: new Date(),
      finishdate: undefined
    }

    tasks = [...tasks, newTask]
    res.status(201).send(newTask)
  } else {
    res.status(403).json('Access denied, you are not logged in')
  }
})

app.put('/tasks/:id', (req, res) => {
  // Endpunkt, welcher bestehend Task verändert und diesen zurück gibt.

  if (cookieValid(req)) {
    if (idCheck(req.params.id)) {
      const { content, finished } = req.body
      if (req.params.id && content && finished) {
        let date
        const createdate = tasks.filter((t) => t.id == req.params.id)[0].createdate
        if ((finished) == 'true') { date = new Date() }
        const updatedTask = {
          id: parseInt(req.params.id),
          content,
          createdate,
          finished: finished == 'true',
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
  } else {
    res.status(403).json('Access denied, you are not logged in')
  }
})

app.delete('/tasks/:id', (req, res) => {
  // Endpunkt, welcher bestehend Task aus der Liste löscht.

  if (cookieValid(req)) {
    const id = req.params.id
    if (idCheck(id)) {
      const deleted = tasks.filter((t) => t.id == id)
      tasks = tasks.filter((t) => t.id != id)

      res.status(200).send(deleted)
    } else {
      res.status(404).json('Task not found')
    }
  } else {
    res.status(403).json('Access denied, you are not logged in')
  }
})

// ------------------------ Auth-Anforderungen: ------------------------

app.post('/login', (req, res) => {
  const { email, password } = req.body
  if (email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) { // email validator inspired by Robin Trachsel (https://github.com/DoctorProgrammer)
    if (password == 'm295') {
      req.session.email = email
      res.status(200).json({ email: req.session.email })
    } else {
      res.status(401).json('invalid login data')
    }
  } else {
    res.status(401).json('invalid email format')
  }
})

app.get('/verify', (req, res) => {
  if (req.session.email) {
    res.status(200).json({ email: req.session.email })
  } else {
    res.status(401).json('currently not logged in')
  }
})

app.delete('/logout', (req, res) => {
  if (req.session.email) {
    req.session.email = undefined
    res.sendStatus(204)
  } else {
    res.status(401).json('cannot log out since you are not logged in')
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

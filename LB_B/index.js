const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let tasks = [
    {
        id: 1,
        content: "Feed the dog",
        finished: false
    },
    {
        id: 2,
        content: "Feed the duck",
        finished: false
    }
]

app.get('/', (req, res) => {
    res.send("Hello there");
});

app.get('/tasks', (req, res) => {
    // Endpunkt, welcher eine Liste aller Tasks zurück gibt.
    res.send(tasks).status(200)
});

app.get('/tasks/:id', (req, res) => {
    // Endpunkt, welcher einen einzelnen Task zurück gibt.
    const id = req.params.id;
    const found = tasks.filter((t) => t.id == id)

    res.send(found).status(200)
});

app.post('/tasks', (req, res) => {
    // Endpunkt, welcher einen neuen Task erstellt und diesen zurück gibt.
    const id = tasks[tasks.length - 1].id + 1
    const newTask = {
        id: id,
        content: "Empty task",
        finished: false
    }

    tasks = [...tasks, newTask]
    res.status(201).send(newTask)
});

app.put('/tasks/:id', (req, res) => {
    // Endpunkt, welcher bestehend Task verändert und diesen zurück gibt.
    if (req.params.id && req.query.content) {
        const updatedTask = {
            id: parseInt(req.params.id),
            content: req.query.content,
            finished: false
        }

        tasks = tasks.map((t) => t.id == updatedTask.id ? updatedTask : t)

        res.status(201).send(updatedTask)
    } else {
        res.sendStatus(422)
    }
});

app.delete('/tasks/:id', (req, res) => {
    // Endpunkt, welcher bestehend Task aus der Liste löscht.
    const id = req.params.id
    const deleted = tasks.filter((t) => t.id == id)
    tasks = tasks.filter((t) => t.id != id)

    res.send(deleted).status(200)
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
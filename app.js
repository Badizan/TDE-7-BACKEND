const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let tasks = [
    {
        "id": 1,
        "name": "Comprar leite",
        "description": "Ir no mercado da esquina e comprar leite",
        "isDone": false
    },
    {
        "id": 2,
        "name": "Estudar para prova de matemática",
        "description": "Revisar os exercícios do capítulo 5",
        "isDone": true
    },
    {
        "id": 3,
        "name": "Fazer exercícios de programação",
        "description": "Resolver os problemas do URI Online Judge",
        "isDone": false
    },
    {
        "id": 4,
        "name": "Ligar para o dentista",
        "description": "Marcar consulta para a próxima semana",
        "isDone": false
    }
];

// Rota para exibir a lista de tarefas
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Rota para criar uma nova tarefa
app.post('/tasks', (req, res) => {
    const { name, description } = req.body;
    const id = tasks.length + 1;
    const newTask = {
        id,
        name,
        description,
        isDone: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Rota para atualizar uma tarefa existente
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { name, description, isDone } = req.body;
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = {
            id: taskId,
            name: name || tasks[taskIndex].name,
            description: description || tasks[taskIndex].description,
            isDone: isDone !== undefined ? isDone : tasks[taskIndex].isDone
        };
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).send('Tarefa não encontrada.');
    }
});

// Rota para excluir uma tarefa existente
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Tarefa não encontrada.');
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});



const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));

let todoList = [
  {
    id: 1,
    todo: 'Implement a REST API',
  },
];

// GET /api/todos
app.get('/api/todos', (req, res) => {
  db.Todo.findAll()
    .then((todos)=>{
      console.log(todos);
      res.json(todos); //express automatically defaults to 200
    })
    .catch((e)=>{
      res.status(500).json( {error: "A database error occurred"})
    })
  // res.json(todoList);
});

// GET /api/todos/:id
app.get('/api/todos/:id', (req, res) => {
  const {id} = req.params;
  db.Todo.findByPk(id)
    .then(todo=>{
      if(!todo){
        res.status(404).json({error: `Could not find Todo with id: ${id}`})
        return;
      }
      res.json(todo)
    })
});

// POST /api/todos
app.post('/api/todos', (req, res) => {
  if (!req.body || !req.body.name) {
    res.status(400).json({
      error: 'Provide todo text',
    });
    return;
  }

  db.Todo.create({
    name: req.body.name
  })
  .then((newTodo)=>{
    res.json(newTodo);
  })
  .catch((e)=>{
    res.status(500).json( {error: "A database error occurred"})
  })
});

// PUT /api/todos/:id
app.put('/api/todos/:id', (req, res) => {
  if (!req.body || !req.body.name) {
    res.status(400).json({
      error: 'Provide todo text',
    });
    return;
  }
  const { id } = req.params;
  db.Todo.findByPk(id)
    .then(todo =>{
      if(!todo){
        res.status(404).json({error: `Could not find Todo with id: ${id}`})
        return;
      }
      todo.name = req.body.name;
      todo.save();
      res.json(todo);
    })
    .catch(e=>{
      res.status(500).json( {error: "A database error occurred"})
    })
});

// DELETE /api/todos/:id
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  db.Todo.destroy({
    where: {
      id: id
    }
  })
    .then(rowsDeleted =>{
      if (rowsDeleted === 1){
        res.status(204).json()
      }else if(rowsDeleted === 0){
        res.status(404).json({error: `Could not find Todo with id: ${id}`})
      }
    })
    .catch(e=>{
      res.status(500).json( {error: "A database error occurred"})
    })
});

app.listen(3000, function () {
  console.log('Todo List API is now listening on port 3000...');
});

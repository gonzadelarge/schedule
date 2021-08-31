const Todo = require('../models/Todo.model');
// const User = require('../models/User.model');

const indexGet = async (req, res, next) => {

  const { userId } = req.params;
  const listaTodos = [];

  console.log(userId)

  try {
    
    const todo = await Todo.find().populate(

      {
        path:"user",
        math: { _id: { _id: userId }}
      }
    )

    todo.forEach(element => {
     
      
      if (element.user.id === userId) {
        listaTodos.push(element);
      }
    });

    // return res.json(todo);
    return res.render( "./schedule/todos", { listaTodos, title: 'Lista de Tareas', isAuthenticated: req.isAuthenticated(), user: req.user });

  } catch (error) {

    return next(error);
  }
};

const oneGet = async (req, res, next) => {

  const { id } = req.params;

  try {

    const todo = await Todo.findById(id);

    return res.render( "./schedule/todo", { todo, title: 'Tarea', isAuthenticated: req.isAuthenticated(), user: req.user });

  } catch (error) {

    return next(error);
  }
};

const nameGet = async (req, res, next) => {

  const { name } = req.params;

  try {

    const todo = await Todo.find({ name: { '$regex': name, '$options': 'i' } });

    return res.json(todo);

  } catch (error) {

    return next(error);
  }
};

const createGet = (req, res, next) => {
  return res.render("./schedule/new-todo", { id: req.user.id, user: req.user });
}

const createPost = async (req, res, next) => {

  const { name, date, message, done } = req.body;

  const newTodo = new Todo({
    name,
    date,
    message,
    done,
    user: req.user.id
  });

  const todo = await newTodo.save();

  return res.redirect(`/todos/${req.user.id}`);
};

const editGet = async (req, res, next) =>{

  const { id } = req.params;
  
  try {

    const todo = await Todo.findById(id);
    
    return res.render("./schedule/edit-todo", {todo, title: 'Editar tarea', isAuthenticated: req.isAuthenticated(), user: req.user});

  } catch (error) {

    return next(error);
  }

  
}

const editPost = async (req, res, next) => {

  try {

      const { id, userId, name, date, message, done } = req.body;
  
      const update = {};

      if (name) update.name = name;
      if (date) update.date = date;
      if (message) update.message = message;
      if (done) update.done = done;
  
      const updateTodo = await Todo.findByIdAndUpdate(id, update, { new: true });

      return res.redirect(`/todos/${userId}`);
      
    } catch (error) {
      return next(error);
    }
};

const deletePost = async (req, res, next) => {

  const { id } = req.params;

  try {
    const deleted = await Todo.findByIdAndDelete(id);

    if (!deleted) {
      return res.json("El elemento que querías borrar no existe");
    } else {
      return res.redirect("/todos");
    }

  } catch (error) {
    return next(error);
  }
}

module.exports = { indexGet, nameGet, createGet, createPost, editGet, editPost, deletePost, oneGet }

const Todo = require('../models/Todo.model');

const indexGet = async (req, res, next) => {
  try {
    const todo = await Todo.find();

    return res.json(todo);
    // return res.render("./schedule/todos", { todos, todotitle: "Lista de Tareas"});

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


const createPost = async (req, res, next) => {

  const { name, date, message, done } = req.body;

  const newTodo = new Todo({
    name,
    date,
    message,
    done,
  });

  const todo = await newTodo.save();

  return res.json(todo);
};

const editPost = async (req, res, next) => {

  try {

      const { id, name, date, message, done } = req.body;
  
      const update = {};

      if (name) update.name = name;
      if (date) update.date = date;
      if (message) update.message = message;
      if (typeof done === "boolean") update.done = done;
  
      const updateTodo = await Todo.findByIdAndUpdate(id, update, { new: true });
      return res.json(updateTodo);
      
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
      return res.redirect("/todo");
    }

  } catch (error) {
    return next(error);
  }
}

module.exports = { indexGet, nameGet, createPost, editPost, deletePost }

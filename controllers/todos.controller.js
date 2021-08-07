const Todo = require('../models/Todo.model');

const indexGet = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    return res.json(todos);
  } catch (error) {
    console.log(error);
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

  console.log(todo);

  return res.json(todo);
};

module.exports = { indexGet, createPost, }

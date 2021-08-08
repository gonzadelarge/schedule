const Meeting = require('../models/Meeting.model');
const Schedule = require('../models/Schedule.model');
const Todo = require('../models/Todo.model');

const indexGet = async (req, res, next) => {
    
  try {

    const schedule = await Schedule.find().populate('todo','meeting');

    return res.status(200).json(schedule);

    // return res.render("./schedule/schedule", { schedule, todotitle: "Lista de Tareas", meettitle: "Lista de Reuniones"});

  } catch (error) {

    return next(error);
  }
};


const createPost = async (req, res, next) => {

  try{
        const {todo, meeting} = req.body;

        const newSchedule = new Schedule({todo, meeting});

        const createEvent = await newSchedule.save();

        console.log(createEvent);

        return res.status(200).json(createEvent);

    } catch(error) {
      
      return next(error);
    }
};



const addPost = async (req, res, next) => {

  try {

    const id = req.body.id;
    
    const todos = await Todo.find();
    const meetings = await Meeting.find();

    const scheduleUpdate = { todo: todos, meeting: meetings };
    const updateSchedule = await Schedule.findByIdAndUpdate(

      id,
      scheduleUpdate,
      { new: true }
    );

    return res.status(200).json(updateSchedule);

  } catch (err) {

      return next(err);
    
  }
}

module.exports = { indexGet, createPost, addPost }
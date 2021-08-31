const Meeting = require('../models/Meeting.model');
const Schedule = require('../models/Schedule.model');
const Todo = require('../models/Todo.model');

const indexGet = async (req, res, next) => {

  const { userId } = req.params;
  const todoList = [];
    
  try {

    const schedule = await Schedule.find().populate(
      
      {
        path:"todo",
        populate: { path:"Todo" },
        math: { _id: { _id: userId }}
      }).populate(
        {
          path:"meeting",
          populate: { path:"meetings" },
          math: { _id: { _id: userId }}
        }
      )

    const scheduleContain = schedule[0];

    return res.render(`./schedule/schedule`, { scheduleContain, isAuthenticated: req.isAuthenticated(), user: req.user });

  } catch (error) {

    return next(error);
  }
};


const createPost = async (req, res, next) => {

  try{
        const {todo, meeting, user } = req.body;

        const newSchedule = new Schedule({todo, meeting, user});

        const createEvent = await newSchedule.save();


        return res.status(200).json(createEvent);

    } catch(error) {
      
      return next(error);
    }
};



const addPost = async (req, res, next) => {

  try {

    const id = req.body.id || '612dff7ad73e5213e0d7092b';

    console.log( 'addPost ---> ', id);
    
    const { userId } = req.body;

    console.log(userId)

    const todos = await Todo.find();
    const meetings = await Meeting.find();

    const scheduleUpdate = { todo: todos, meeting: meetings };

    console.log(scheduleUpdate);

    const scheduleContain = await Schedule.findByIdAndUpdate(

      id,
      scheduleUpdate,
      { new: true }
    );

    return res.redirect(`/schedule/${userId}`);

  } catch (err) {

      return next(err);
    
  }
}

module.exports = { indexGet, createPost, addPost }
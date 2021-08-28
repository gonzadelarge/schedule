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
        populate: { path:"Todo" }
      }).populate(
        {
          path:"meeting",
          populate: { path:"meetings" }
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

    const id = req.body.id || '6129e98685e0933720682e7a';

    console.log( 'addPost ---> ', id);
    
    const { userId } = req.body;

    
    const todos = await Todo.find();
    const meetings = await Meeting.find();

    const scheduleUpdate = { todo: todos, meeting: meetings };

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
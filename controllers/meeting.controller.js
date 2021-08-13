const Meeting = require('../models/Meeting.model');

const indexGet = async (req, res, next) => {
  try {
    const meeting = await Meeting.find();


    return res.render( "./schedule/meetings", { meeting, title: 'Lista de Reuniones', isAuthenticated: req.isAuthenticated(), user: req.user });
    // return res.json(meeting)

  } catch (error) {

    return next(error);
  }
};

const createPost = async (req, res, next) => {

  const { name, date, message, done } = req.body;

  const newMeeting = new Meeting({

    name,
    date,
    message,
    done

  });

  const meeting = await newMeeting.save();

  return res.json(meeting);
};

const editPost = async (req, res, next) => {

  try {

      const { id, name, date, message, done } = req.body;

      const update = {};

      if (name) update.name = name;
      if (date) update.date = date;
      if (message) update.message = message;
      if (typeof done === "boolean") update.done = done;

      const updateMeeting = await Meeting.findByIdAndUpdate(id, update, { new: true });
      return res.json(updateMeeting);

    } catch (error) {
      return next(error);
    }
};

const deletePost = async (req, res, next) => {

  const { id } = req.params;

  try {
    const deleted = await Meeting.findByIdAndDelete(id);

    if (!deleted) {
      return res.json("El elemento que querías borrar no existe");
    } else {
      return res.redirect("/meet");
    }

  } catch (error) {
    return next(error);
  }
}

module.exports = { indexGet, createPost, editPost, deletePost }

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

const oneGet = async (req, res, next) => {

  const { id } = req.params;

  try {

    const meet = await Meeting.findById(id);

    return res.render( "./schedule/meet", { meet, title: 'Reunión', isAuthenticated: req.isAuthenticated(), user: req.user });

  } catch (error) {

    return next(error);
  }
};

const createGet = (req, res, next) =>{
  return res.render("./schedule/new-meet");
}

const createPost = async (req, res, next) => {

  const { name, date, message, done } = req.body;

  const newMeeting = new Meeting({

    name,
    date,
    message,
    done

  });

  const meeting = await newMeeting.save();

  return res.redirect("/meetings");
};

const editGet = (req, res, next) =>{

  const { id, name, date, message, done } = req.params;
  
  const meet = {id, name, date, message, done};

  return res.render("./schedule/edit-meet", {meet, title: 'Editar reunión', isAuthenticated: req.isAuthenticated(), user: req.user});
}

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
      return res.redirect("/meetings");
    }

  } catch (error) {
    return next(error);
  }
}

module.exports = { 
    indexGet, 
    oneGet, 
    createPost, 
    createGet, 
    editGet,
    editPost, 
    deletePost 
  }

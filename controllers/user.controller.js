const User = require('../models/User.model');

const indexGet = async (req, res, next) => {

  try {
    const user = await User.find();
    return res.json(user);

  } catch (error) {

    return next(error);
  }
};

const userGet = async (req, res, next) => {

  const { id } = req.user

  try {
    const user = await User.findById(id);
    return res.render( "./user", { user, title: req.user, isAuthenticated: req.isAuthenticated(), user: req.user });

  } catch (error) {

    return next(error);
  }
};

const editPost = async (req, res, next) => {

    try {
        
      console.log(req.body)
        const { id, name, surname, nick, email, password, birthDay, avatar } = req.body;
    
        const update = {};

        if (name) update.name = name;
        if (surname) update.surname = surname;
        if (nick) update.nick = nick;
        if (email) update.email = email;
        if (password) update.password = password;
        if (birthDay) update.birthDay = birthDay;
        if (avatar) update.avatar = avatar;
        
        const updateUser = await User.findByIdAndUpdate(id, update, { new: true });
        
        return res.redirect(`/users/user/${id}`);

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

module.exports = { indexGet, userGet, editPost, deletePost }

const User = require('../models/User.model');

const indexGet = async (req, res, next) => {
  try {
    const user = await User.find();
    return res.json(user);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const editPost = async (req, res, next) => {

    try {
        
        const { name, date, message, done } = req.body;
    
        const update = {};
        if (name) update.name = name;
        if (date) update.date = date;
        if (message) update.message = message;
        if (typeof done === "boolean") update.done = done;
    
        const updateUser = await User.findByIdAndUpdate(id, update, { new: true });
        return res.json(updateUser);
        
      } catch (error) {
        return next(error);
      }
};

module.exports = { indexGet, editPost, }

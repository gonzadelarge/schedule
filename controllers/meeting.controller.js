const Meeting = require('../models/Meeting.model');

const indexGet = async (req, res, next) => {
  try {
    const meeting = await Meeting.find();
    return res.json(meeting);
  } catch (error) {
    console.log(error);
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

  console.log(meeting);

  return res.json(meeting);
};

module.exports = { indexGet, createPost }

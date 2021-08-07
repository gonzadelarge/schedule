const express = require('express');
const controller = require('../controllers/todos.controller');

const router = express.Router();

router.get('/', controller.indexGet);

router.post('/create', controller.createPost);

module.exports = router;
const express = require('express');
const controller = require('../controllers/meeting.controller');
const {isAuth} = require('../middlewares/auth.middlewares');


const router = express.Router();

router.get('/', controller.indexGet);

router.post('/create', controller.createPost);

router.put('/edit', controller.editPost);

router.delete('/delete/:id', controller.deletePost);

module.exports = router;
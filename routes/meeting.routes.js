const express = require('express');
const controller = require('../controllers/meeting.controller');
const {isAuth} = require('../middlewares/auth.middlewares');


const router = express.Router();

router.get('/', [isAuth], controller.indexGet);

router.post('/create', [isAuth], controller.createPost);

router.put('/edit', [isAuth], controller.editPost);

router.delete('/delete/:id', [isAuth], controller.deletePost);

module.exports = router;
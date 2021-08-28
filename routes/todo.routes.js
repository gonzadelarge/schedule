const express = require('express');
const {isAuth} = require('../middlewares/auth.middlewares');
const controller = require('../controllers/todos.controller');

const router = express.Router();


router.get('/todo/:id', [isAuth], controller.oneGet);

router.get('/create', [isAuth], controller.createGet);

router.post('/create', [isAuth], controller.createPost);

router.get('/edit/:id', [isAuth], controller.editGet);

router.put('/edit', [isAuth], controller.editPost);

router.delete('/todo/delete/:id', [isAuth], controller.deletePost);

// router.get('/filter/:name', controller.nameGet);

router.get('/:userId', [isAuth], controller.indexGet);


module.exports = router;
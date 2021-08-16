const express = require('express');
const controller = require('../controllers/meeting.controller');
const {isAuth} = require('../middlewares/auth.middlewares');


const router = express.Router();

router.get('/', [isAuth], controller.indexGet);

router.get('/meet/:id', [isAuth], controller.oneGet);

router.get('/create', [isAuth], controller.createGet);

router.post('/create', [isAuth], controller.createPost);

router.get('/edit/:id', [isAuth], controller.editGet);

router.put('/edit/', [isAuth], controller.editPost);

router.delete('/meet/delete/:id', [isAuth], controller.deletePost);

module.exports = router;
const express = require('express');
const controller = require('../controllers/user.controller');
const {isAuth} = require('../middlewares/auth.middlewares');
const { upload } = require('../middlewares/file.middleware');


const router = express.Router();

router.get('/', [isAuth], controller.indexGet);

router.get('/user/:id', [isAuth], controller.userGet);

router.put('/edit', [isAuth, upload.single('avatar')], controller.editPost);

router.delete('/delete/:id', [isAuth], controller.deletePost);

module.exports = router; 
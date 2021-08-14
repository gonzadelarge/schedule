const express = require('express');
const controller = require('../controllers/meeting.controller');
const {isAuth} = require('../middlewares/auth.middlewares');


const router = express.Router();

router.get('/', controller.indexGet);

router.get('/meet/:id', controller.oneGet);

router.get('/create', controller.createGet);

router.post('/create', controller.createPost);

router.get('/edit/:id', controller.editGet);

router.put('/edit/', controller.editPost);

router.delete('/meet/delete/:id', controller.deletePost);

module.exports = router;
const express = require('express');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.get('/', controller.indexGet);

router.put('/edit', controller.editPost);

router.delete('/delete/:id', controller.deletePost);

module.exports = router;
const express = require('express');
const controller = require('../controllers/auth.controller');

const router = express.Router();

router.get("/login", controller.loginGet);
router.post("/login", controller.loginPost);

router.post('/register', controller.registerPost);
router.post('/login', controller.loginPost);

router.post("/logout", controller.logoutPost);

module.exports = router;
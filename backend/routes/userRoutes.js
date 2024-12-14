const { createUser, getUser, login, logout, checkForSession } = require('../controllers/userControllers');
const express = require('express');
const router = express.Router();

router.post('/add',createUser);
router.post('/login',login);
router.get('/logout',logout);
router.get('/session',checkForSession)

module.exports = router;
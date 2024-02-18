const express = require('express');
const { register, login, getContacts } = require('../controllers/userController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get("/contacts/:_id", getContacts);

module.exports = router;
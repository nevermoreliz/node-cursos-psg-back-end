const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth.controller')
const {validatorLogin, validatorRegister} = require("../validators/auth-validator");


//TODO: http://localhost:30017api/auth
router.post('/login', validatorLogin, AuthController.login)
router.post('/register', validatorRegister, AuthController.register)

module.exports = router
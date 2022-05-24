const express = require('express')
const router = express.Router()
const UsuarioController = require('./../controllers/usuario.controller')
const {validatorUsuario, validatorIdUsuario} = require("../validators/usuario-validator")
const authMiddleware = require('./../middleware/session-middleware')
const checkRol = require("../middleware/rol-middleware");

router.get('/', authMiddleware, checkRol(['administrador']), UsuarioController.index)
router.get('/:id', authMiddleware, UsuarioController.show)
router.post('/', authMiddleware, validatorUsuario, UsuarioController.store)
router.put('/:id', authMiddleware, UsuarioController.update)
router.delete('/:id', authMiddleware, UsuarioController.delete)

module.exports = router
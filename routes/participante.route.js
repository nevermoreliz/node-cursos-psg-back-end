const express = require('express')
const router = express.Router()
const ParticipanteController = require('./../controllers/participante.controller')
const authMiddleware = require("../middleware/session-middleware");
const checkRol = require("../middleware/rol-middleware");

//TODO: http://localhost:3001/api/participante

router.get('/', authMiddleware, checkRol(['administrador']), ParticipanteController.index)
router.get('/:id', authMiddleware, checkRol(['administrador']), ParticipanteController.show)
router.post('/', authMiddleware, checkRol(['administrador']), ParticipanteController.store)
router.put('/:id', authMiddleware, checkRol(['administrador']), ParticipanteController.update)
router.put('/:id', authMiddleware, checkRol(['administrador']), ParticipanteController.delete)

module.exports = router
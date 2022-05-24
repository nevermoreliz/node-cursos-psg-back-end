const express = require('express')
const router = express.Router()
const expressFileUpload = require('express-fileupload')
const PsgCursoController = require('./../controllers/psg-curso.controller')
const authMiddleware = require("../middleware/session-middleware");
const checkRol = require("../middleware/rol-middleware");
const {validatorPsgCurso} = require("../validators/psg-curso-validator");

router.use(expressFileUpload())
//TODO: http://localhost:3001/api/psg-curso

router.get('/', authMiddleware, checkRol(['administrador', 'docente']), validatorPsgCurso, PsgCursoController.index)
router.get('/:id', authMiddleware, checkRol(['administrador', 'docente']), validatorPsgCurso, PsgCursoController.show)
router.post('/', authMiddleware, checkRol(['administrador', 'docente']), validatorPsgCurso, PsgCursoController.store)
router.put('/:id', authMiddleware, checkRol(['administrador', 'docente']), validatorPsgCurso, PsgCursoController.update)
router.put('/:id', authMiddleware, checkRol(['administrador', 'docente']), validatorPsgCurso, PsgCursoController.delete)

module.exports = router
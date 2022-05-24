const express = require('express')
const router = express.Router()
const expressFileUpload = require('express-fileupload')
const ConfiguracionCursoController = require('./../controllers/configuracion-curso.controller')
const authMiddleware = require("../middleware/session-middleware");
const checkRol = require("../middleware/rol-middleware");
const {validatorConfiguracionCurso} = require("../validators/configuracion-curso-validator");

//TODO: http://localhost:3000/api/configuracion-curso
router.use(expressFileUpload())

router.get('/', ConfiguracionCursoController.index)
router.get('/disponible', ConfiguracionCursoController.indexAvailable)
router.get('/:id', ConfiguracionCursoController.show)
router.post('/', authMiddleware, checkRol(['administrador', 'docente']), validatorConfiguracionCurso, ConfiguracionCursoController.store)
router.put('/:id', authMiddleware, checkRol(['administrador']), validatorConfiguracionCurso, ConfiguracionCursoController.update)
router.delete('/:id', authMiddleware, checkRol(['administrador']), ConfiguracionCursoController.delete)

module.exports = router
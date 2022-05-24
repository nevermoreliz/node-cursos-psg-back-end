const {validateResult} = require("../utils/handle-validator")
const {check} = require('express-validator')

const validatorPsgCurso = [
    check('nombre_curso').exists().notEmpty().withMessage('El campo nombre del curso es requerido'),
    check('version').exists().notEmpty().withMessage('El campo version del curso es requerido'),
    // check('portada_curso').exists().notEmpty().withMessage('El campo portda_curso es requerido'),
    check('configuracion_curso_id').exists().notEmpty().withMessage('El campo id de configuracion del curso es requerido'),
    (req, res, next) => {
        return validateResult(req, res, next)
    }
]

module.exports = {validatorPsgCurso}
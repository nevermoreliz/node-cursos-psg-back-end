const {validateResult} = require("../utils/handle-validator")
const {check} = require('express-validator')

const validatorConfiguracionCurso = [
    // check('id_course_moodle').exists().notEmpty().withMessage('El campo del asignar un id de curso de moodle es requerido'),
    check('fecha_inicial').exists().notEmpty().withMessage('El campo fecha inicial es requerido'),
    check('fecha_final').exists().notEmpty().withMessage('El campo fecha final es requerido'),
    check('carga_horaria').exists().notEmpty().withMessage('El campo carga horaria es requerido'),
    check('detalle_curso').exists().notEmpty().withMessage('El campo detalle del curso es requerido'),
    // check('url_pdf').exists().notEmpty().withMessage('El campo la url del pdf es requerido es requerido'),
    // check('banner_curso').exists().notEmpty().withMessage('El campo del banner del curso es requerido'),
    check('celular_referencia').exists().notEmpty().withMessage('El campo celular de referencia es requerido'),
    check('inversion').exists().notEmpty().withMessage('El campo inversion es requerido'),
    check('descuento').exists().notEmpty().withMessage('El campo descuento es requerido'),
    check('fecha_inicio_descuento').exists().notEmpty().withMessage('El campo fecha inicio del descuento es requerido'),
    check('fecha_fin_descuento').exists().notEmpty().withMessage('El campo fecha de finalizar el desciento es requerido'),
    check('horario').exists().notEmpty().withMessage('El campo horario es requerido'),
    check('fecha_inicio_lanzamiento').exists().notEmpty().withMessage('El campo fecha de lanzamiento del curso es requerido'),
    check('mensaje_whatsapp').exists().notEmpty().withMessage('El campo mensaje por whatsap es requerido'),
    (req, res, next) => {
        return validateResult(req, res, next)
    }
]

module.exports = {validatorConfiguracionCurso}
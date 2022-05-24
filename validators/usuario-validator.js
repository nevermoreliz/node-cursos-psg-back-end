const {validateResult} = require("../utils/handle-validator");
const {check} = require('express-validator')

const validatorUsuario = [
    check('celular').exists().notEmpty().withMessage('El campo celular es requerido'),
    check('contrasenia').exists().notEmpty().withMessage('El campo constrasenia es requerido'),
    check('participante_id').exists().notEmpty().withMessage('El campo id del participante es requerido'),
    check('estado').exists().notEmpty().withMessage('El campo estado es requerido'),
    (req, res, next) => {
        return validateResult(req, res, next)
    }
]

const validatorIdUsuario = [
    check('usuario_id').exists().withMessage('El campo id es requerido'),
    (req, res, next) => {
        return validateResult(req, res, next)
    }
]

module.exports = {validatorUsuario, validatorIdUsuario}
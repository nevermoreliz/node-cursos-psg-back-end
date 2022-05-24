const {validateResult} = require("../utils/handle-validator");
const {check} = require('express-validator')

const validatorRegister = [
    // check('id_user').exists().withMessage('El campo id de usuario de moodle es requerido'),
    check('ci').exists().notEmpty().withMessage('El campo ci es requerido'),
    check('expedido').exists().notEmpty().withMessage('El campo expedido del participante es requerido'),
    check('nombre').exists().notEmpty().withMessage('El campo nombre es requerido'),
    check('paterno').exists().notEmpty().withMessage('El campo apellido paterno es requerido'),
    check('materno').exists().notEmpty().withMessage('El campo apellido materno es requerido'),
    check('genero').exists().notEmpty().withMessage('El campo genero es requerido'),
    check('id_municipio').exists().notEmpty().withMessage('El campo id de municipio es requerido'),
    check('id_profesion_oficio').exists().notEmpty().withMessage('El campo id de profesion de oficio es requerido'),
    check('fecha_nacimiento').exists().notEmpty().withMessage('El campo fecha nacimiento es requerido'),
    check('correo').exists().notEmpty().isEmail().withMessage('El campo correo es requerido'),
    check('celular').exists().notEmpty().withMessage('El campo celular es requerido'),
    check('contrasenia').exists().notEmpty().withMessage('El campo contrasenia es requerido'),
    (req, res, next) => {
        return validateResult(req, res, next)
    }
]

const validatorLogin = [
    check('celular').exists().notEmpty().withMessage('El campo celular es requerido'),
    check('contrasenia').exists().notEmpty().withMessage('El campo contraseña es requerido'),
    (req, res, next) => {
        return validateResult(req, res, next)
    }
]

module.exports = {validatorRegister, validatorLogin}
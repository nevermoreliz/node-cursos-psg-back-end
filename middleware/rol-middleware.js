const {handleErrorResponse} = require("../utils/handle-error");

/**
 * array con los roles permitidos
 * @param roles
 * @returns {(function(*, *=, *): void)|*}
 */
const checkRol = (roles) => (req, res, next) => {

    try {
        const {usuarioRolesAuthMiddleware} = req

        /**
         * verifica que si los roles del usuario esta incluido en los roles de permisos que envia de
         * los middlewares de la ruta
         * TODO: true o false
         * @return {boolean}
         */
        const checkValueRol = roles.some((rolSingle) => usuarioRolesAuthMiddleware.includes(rolSingle))

        if (!checkValueRol) {
            handleErrorResponse(res, 'El usuario no tiene permisos para realizar esta acción', 403)
        }

        next()

    } catch (e) {
        handleErrorResponse(res, 'error de permisos', 403)
    }
}

module.exports = checkRol

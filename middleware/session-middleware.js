const db = require("../models");
const {verifyToken} = require("../utils/handle-jwt");
const {handleErrorResponse} = require("../utils/handle-error");
const authMiddleware = async (req, res, next) => {
    try {

        /**
         * verificamos que en los headers tenga el token en la variable authorization
         */
        if (!req.headers.authorization) {
            handleErrorResponse(res, 'nesesita una session', 401)
        }

        /**
         * obtener el token jwt
         * @type {string}
         */
        const token = req.headers.authorization.split(' ').pop()

        /**
         * pasamos al comparado de token de jwt
         * @type {null}
         */
        const dataToken = await verifyToken(token)

        /**
         * si no existe una propiedad usuario_id en el token mandamos un error
         */
        if (!dataToken.usuario_id) {
            handleErrorResponse(res, 'error de id de token', 401)
        }

        /**
         * buscamos el usuario en la base de datos
         * @type {*}
         */
        const usuario = await db.Usuario.findByPk(dataToken.usuario_id)

        /**
         * buscamos participante en la base de datos
         * @type {*}
         */
        const participante = await db.Participante.findByPk(usuario.participante_id)

        /**
         * buscar los roles que tiene el usuario
         * @type {Model[]}
         */

        const usuarioRoles = await db.Usuario.findOne({
            attributes: [],
            include: {
                model: db.Rol,
                as: 'roles',
                attributes: ['nombre_rol'],
                through: {
                    attributes: [],
                    where: {
                        estado: "registrado"
                    }
                }
            },
            where: {
                usuario_id: usuario.usuario_id,
                estado: "registrado"
            }
        })

        /**
         * poner en un array los roles del usuario
         */
        const roles = usuarioRoles.roles.map(rol => rol.nombre_rol)


        /**
         * enviamos al middleware el usuario y participante
         * @type {*}
         */
        req.usuarioAuthMiddleware = usuario
        req.participanteAuthMiddleware = participante
        req.usuarioRolesAuthMiddleware = roles

        next()


    } catch (e) {
        console.log('Error: ', e)
        handleErrorResponse(res, 'No tiene una auntenticacion por token', 500)
    }
}

module.exports = authMiddleware
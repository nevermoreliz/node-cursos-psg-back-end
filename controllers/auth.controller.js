const db = require("../models")
const {Op} = require("sequelize");
const {tokenSing} = require("../utils/handle-jwt");
const {fechaYHora} = require("../utils/handle-date");
const {handleErrorResponse} = require("../utils/handle-error");
const {encrypt, compare} = require("../utils/handle-password");
const {matchedData} = require("express-validator");


module.exports = {
    /**
     * Este controlador es el encargado de iniciar a un participante
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async login(req, res) {

        try {
            /**
             * obtenemos una request limpia segun las validaciones por la ruta
             * @type {Record<string, any>}
             */
            req = matchedData(req)


            /**
             * verificar si existe
             * @type {*}
             */
            const usuarioShow = await db.Usuario.findOne({
                where: {
                    celular: req.celular,
                    estado: {[Op.ne]: "eliminado"}
                }
            })

            /**
             * verificamos si el usuario existe
             */
            if (!usuarioShow) {
                handleErrorResponse(res, 'No existe el usuario', 404)
            }

            //region:: procedimiento por que el usuario existe
            const hashPassword = usuarioShow.contrasenia
            const check = await compare(req.contrasenia, hashPassword)

            /**
             * verificamos que la contraseña sea correcta
             */
            if (!check) {
                handleErrorResponse(res, 'verifique su usuario o contraseña', 401)
            }

            usuarioShow.set('contrasenia', undefined, {strict: false})

            /**
             * objeto donde se pasa loas datos de payload de jwt
             * @type {{participante_id: *, usuario_id: *}}
             */
            const dataPayload = {
                participante_id: usuarioShow.participante_id,
                usuario_id: usuarioShow.usuario_id
            }

            /**
             * enviamos una data de respuesta an cliente
             * @type {{usuarioShow: *, token: void}}
             */
            const data = {
                token: await tokenSing(dataPayload),
                usuarioShow
            }

            /**
             * enviamos una respuesta al cliente
             */
            return res.status(200).json({
                code: 200,
                success: true,
                message: 'Usuario logueado',
                data
            });
            //endregion


        } catch (e) {
            console.log(`Error: ${e}`);
            handleErrorResponse(res, 'Error al intentar iniciar sesion', 500)
        }
    },

    /**
     * este controlador es el encargado de registrar un participante y un usuario
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async register(req, res) {

        try {
            // const {id} = req.params
            req = matchedData(req)
            const contrasenia = await encrypt(req.contrasenia)

            const body = {...req, contrasenia}

            /**
             * verificar si un participante ya esta registrado con el numero de celular
             * @type {*}
             */
            const dataParticipante = await db.Participante.findOne({
                where: {
                    celular: body.celular
                }
            })

            if (dataParticipante) {

                //region:: registro de usuario cuando ya esta registrado un participante

                /**
                 * Si el participante ya esta registrado, registrar un usuario y asignar el rol de "estudiante"
                 */
                console.log('participante ya existe')

                /**
                 * verificar si el participante ya tiene un usuario registrado
                 * @type {*}
                 */
                const verificarUsuario = await db.Usuario.findOne({
                    where: {
                        participante_id: dataParticipante.id_participante
                    }
                })

                if (verificarUsuario) {
                    /**
                     * enviar respuesta al cliente
                     */
                    return res.status(200).json({
                        code: 200,
                        success: true,
                        message: 'el participante ya tiene un usuario registrado',
                    });
                }

                /**
                 * registrar usuario del participante existente
                 * @type {*}
                 */
                const usuario = await db.Usuario.create({
                    celular: dataParticipante.celular,
                    contrasenia: body.contrasenia,
                    participante_id: dataParticipante.id_participante,
                    estado: "registrado",
                    created_at: fechaYHora,
                    updated_at: fechaYHora
                }, {
                    fields: ['celular', 'contrasenia', 'participante_id', 'estado', 'created_at', 'updated_at']
                })

                /**
                 *  asignar rol "estudiante"
                 */
                await db.UsuarioRoles.create({
                    usuario_id: usuario.usuario_id,
                    rol_id: 1,
                    estado: "registrado",
                    created_at: fechaYHora,
                    updated_at: fechaYHora
                }, {
                    fields: ['usuario_id', 'rol_id', 'estado', 'created_at', 'updated_at']
                })

                /**
                 * datos para enviar al payload de jwt
                 * @type {{participante_id: {autoIncrement: boolean, type: *, primaryKey: boolean}, usuario_id: *}}
                 */
                const dataPayload = {
                    participante_id: dataParticipante.id_participante,
                    usuario_id: usuario.usuario_id,
                }

                /**
                 * datos para enviar al cliente
                 * @type {{usuario: *, token: void}}
                 */
                const data = {
                    token: await tokenSing(dataPayload),
                    usuario
                }

                /**
                 * enviar respuesta al cliente
                 */
                return res.status(200).json({
                    code: 200,
                    success: true,
                    message: 'Participante existente se registro su Usuario correctamente',
                    data
                });

                //endregion

            }

            /**
             * si el participante no existe, registrarlo
             */

            //region:: registro de usuario cuando no esta registrado un participante
            console.log('participante no existe')

            /**
             * registrar participante
             * @type {*}
             */
            const participante = await db.Participante.create({
                ci: body.ci,
                expedido: body.expedido.toUpperCase(),
                nombre: body.nombre.toUpperCase(),
                paterno: body.paterno.toUpperCase(),
                materno: body.materno.toUpperCase(),
                genero: body.genero.toUpperCase(),
                id_municipio: body.id_municipio,
                id_profesion_oficio: body.id_profesion_oficio,
                fecha_nacimiento: body.fecha_nacimiento,
                correo: body.correo.toLowerCase(),
                celular: body.celular
            }, {
                fields: ['ci', 'expedido', 'nombre', 'paterno', 'materno', 'genero', 'id_municipio', 'id_profesion_oficio', 'fecha_nacimiento', 'correo', 'celular']
            })

            /**
             * registrar usuario del participante
             * @type {*}
             */
            const usuario = await db.Usuario.create({
                celular: body.celular,
                contrasenia: body.contrasenia,
                participante_id: participante.id_participante,
                estado: "registrado",
                created_at: fechaYHora,
                updated_at: fechaYHora
            }, {
                fields: ['celular', 'contrasenia', 'participante_id', 'estado', 'created_at', 'updated_at']
            })

            usuario.set('contrasenia', undefined, {strict: false})

            /**
             * asignar rol "estudiante"
             */
            await db.UsuarioRoles.create({
                usuario_id: usuario.usuario_id,
                rol_id: 1,
                estado: "registrado",
                created_at: fechaYHora,
                updated_at: fechaYHora
            }, {
                fields: ['usuario_id', 'rol_id', 'estado', 'created_at', 'updated_at']
            })

            const dataPayload = {
                participante_id: participante.id_participante,
                usuario_id: usuario.usuario_id,
            }

            const data = {
                token: await tokenSing(dataPayload),
                usuario
            }

            /**
             * enviar respuesta al cliente
             */
            return res.status(200).json({
                code: 200,
                success: true,
                message: 'Usuario registrado correctamente',
                data
            });

            //endregion

        } catch (e) {
            console.log(`Error: ${e}`);
            handleErrorResponse(res, 'Error al intentar registrarse', 500)
        }
    },

}
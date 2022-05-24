const db = require("../models")
const paginationCustom = require("../utils/handle-paginacion");
const {Op} = require("sequelize");
const {handleErrorResponse} = require("../utils/handle-error");
const {fechaYHora} = require("../utils/handle-date");
const {Usuario} = require("../models")
const {matchedData} = require("express-validator");

/**
 * index -> mostrar todos los registros
 * show/{id} -> monstrar un registro
 * store -> guardar un registro
 * update/{id} -> actualizar un registro
 * delete/{id} -> eliminar un registro
 **/

module.exports = {
    async index(req, res) {

        try {

            //region:: procedimiento si se envia parametros query para la paginacion
            /**
             * 1. obtener el numero de pagina = page
             * 2. obtener el numero de registros por pagina = limit
             */
            if (req.query.page || req.query.limit) {
                /**
                 * helper para validar que los parametros query sean numeros
                 * para la paginacion
                 * @type {{limit: number, page: number}}
                 */
                const pagination = paginationCustom(req)

                /**
                 * listar toda la lista de usuarios en la base de datos
                 * @type {Model[]}
                 */
                const usuarioIndex = await db.Usuario.findAndCountAll({
                    where: {
                        estado: {[Op.ne]: "eliminado"}
                    },
                    limit: pagination.limit,
                    offset: pagination.page * pagination.limit
                })

                /**
                 * estructura de data para la respuesta
                 */
                const data = {
                    usuarios: usuarioIndex.rows,
                    totalPages: Math.ceil(usuarioIndex.count / pagination.limit),
                }

                /**
                 * enviar respuesta al cliente
                 */
                return res.status(200).json({
                    code: 200,
                    success: true,
                    data
                })
            }
            //endregion

            //region:: procedimiento si no se envia parametros query para la paginacion
            /**
             * listar toda la lista de usuarios en la base de datos
             * sean distintos a estado = eliminado
             * @type {Model[]}
             */
            const usuarioIndex = await db.Usuario.findAll({
                where: {
                    estado: {[Op.ne]: "eliminado"}
                }
            })

            /**
             * enviar respuesta al cliente
             */
            return res.status(200).json({
                code: 200,
                success: true,
                data: usuarioIndex
            });
            //endregion

        } catch (e) {
            console.log(`Error: ${e}`);
            handleErrorResponse(res, 'Error al mostrar todos los registro de usuario', 500)
        }
    },

    async show(req, res) {

        try {
            const {id} = req.params
            const data = await db.Usuario.findOne({
                where: {
                    usuario_id: id,
                    estado: {[Op.ne]: "eliminado"}
                }
            })

            if (!data) {
                return res.status(404).json({
                    code: 404,
                    success: false,
                    message: 'No se encontro ningun registro con ese id de usuario'
                })
            }

            return res.status(200).json({
                code: 200,
                success: true,
                data
            })

        } catch (e) {
            console.log(`Error: ${e}`);
            handleErrorResponse(res, 'Error al mostrar un registro de usuario', 500)
        }
    },

    async store(req, res) {
        try {
            const body = req.body
            const bodyClean = matchedData(req)


            await Usuario.create(
                {
                    celular: data.celular,
                    contrasenia: data.contrasenia,
                    participante_id: data.participante_id,
                    estado: data.estado,
                    created_at: fechaYHora,
                    updated_at: fechaYHora,
                    user_created: 1
                }, {
                    fields: [
                        'celular',
                        'contrasenia',
                        'participante_id',
                        'estado',
                        'created_at',
                        'updated_at',
                        'user_created']
                })

            return res.status(200).json({
                code: 200,
                success: true,
                message: 'usuario registrado'
            })

        } catch (e) {
            console.log(`Error: ${e}`);
            handleErrorResponse(res, 'Error al guardar un usuario', 500)
        }
    },

    async update(req, res) {
        try {
            const {id} = req.params
            const bodyClean = matchedData(req)

            await db.Usuario.update({
                celular: bodyClean.celular,
                contrasenia: bodyClean.contrasenia,
                participante_id: bodyClean.participante_id,
                estado: bodyClean.estado,
                updated_at: fechaYHora,
                user_created: 1
            }, {
                where: {
                    usuario_id: id
                }
            })

            return res.status(200).json({
                code: 200,
                success: true,
                message: 'usuario actualizado'
            });

        } catch (e) {
            console.log(`Error: ${e}`);
            handleErrorResponse(res, 'Error al actualizar un registro de usuario', 500)
        }
    },

    async delete(req, res) {
        try {
            const {id} = req.params

            await db.Usuario.update({
                estado: 'eliminado',
            }, {
                where: {
                    usuario_id: id
                }
            })

            return res.status(200).json({
                code: 200,
                success: true,
                message: 'usuario eliminado'
            });

        } catch (e) {
            console.log(`Error: ${e}`);
            handleErrorResponse(res, 'Error al eliminar un registro de usuario', 500)
        }
    },

}
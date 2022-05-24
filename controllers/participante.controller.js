const db = require("../models")
const paginationCustom = require("../utils/handle-paginacion");
const {handleErrorResponse} = require("../utils/handle-error");

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
                 * listar toda la lista de participantes en la base de datos
                 * @type {Model[]}
                 */
                const participanteIndex = await db.Participante.findAndCountAll({
                    limit: pagination.limit,
                    offset: pagination.page * pagination.limit
                })

                /**
                 * estructura de data para la respuesta
                 */
                const data = {
                    participantes: participanteIndex.rows,
                    totalPages: Math.ceil(participanteIndex.count / pagination.limit),
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

            //region:: procedimiento si no hay parametros query en la uri
            /**
             * listar toda la lista de participantes en la base de datos
             * @type {Model[]}
             */
            const participanteIndex = await db.Participante.findAll()

            /**
             * enviar respuesta al cliente
             */
            return res.status(200).json({
                code: 200,
                success: true,
                data: participanteIndex,
            });
            //endregion

        } catch (e) {
            console.log(`Error: ${e}`);
            handleErrorResponse(res, 'Error al obtener todos los registro de participantes', 500);
        }
    },

    async show(req, res) {

        try {
            /**
             * obtener el id del participante por la url
             * @type {number}
             */
            const {id} = req.params

            /**
             * obtener el detalle del participante
             * @type {Model}
             */
            const participanteShow = await db.Participante.findByPk(id)

            /**
             * enviar respuesta al cliente
             */
            return res.status(200).json({
                code: 200,
                success: true,
                data: participanteShow
            });

        } catch (e) {
            console.log(`Error: ${e}`);
            handleErrorResponse(res, 'Error un registro de participante', 500);
        }
    },

    async store(req, res) {
        try {
            const data = 'hola mundo'
            return res.status(200).json(data);

        } catch (e) {
            console.log(`Error: ${e}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los usuarios'
            });
        }
    },

    async update(req, res) {
        try {
            const {id} = req.params

            const data = 'hola mundo'
            return res.status(200).json(data);

        } catch (e) {
            console.log(`Error: ${e}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los usuarios'
            });
        }
    },

    async delete(req, res) {
        try {
            const {id} = req.params

            const data = 'hola mundo'
            return res.status(200).json(data);

        } catch (e) {
            console.log(`Error: ${e}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los usuarios'
            });
        }
    },

}
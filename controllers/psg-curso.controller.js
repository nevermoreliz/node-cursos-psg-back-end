const db = require("../models");
const {v4: uuidv4} = require('uuid');
const paginationCustom = require("../utils/handle-paginacion");
const path = require("path");
const {fechaYHora} = require("../utils/handle-date");
const {extensionValid} = require("../utils/handle-validation-extension");
const {createDirectory} = require("../utils/handle-fs-mkdir");
const {matchedData} = require("express-validator");
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

            /**
             * consultar si hay query en la url de la peticion para la paginacion
             */
            if (req.query.page || req.query.limit) {

                /**
                 * helper para validar que los parametros query sean numeros
                 * para la paginacion
                 * @type {{limit: number, page: number}}
                 */
                const pagination = paginationCustom(req)

                /**
                 * listar toda la lista de cursos psg en la base de datos
                 * @type {Model[]}
                 */
                const psgCurso = await db.CursoPsg.findAndCountAll({
                    limit: pagination.limit,
                    offset: pagination.page * pagination.limit
                })

                /**
                 * estructura de data para la respuesta
                 */
                const data = {
                    psg_curso: psgCurso.rows,
                    totalPages: Math.ceil(psgCurso.count / pagination.limit),
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


            const psgCurso = await db.CursoPsg.findAll()

            return res.status(200).json({
                code: 200,
                success: true,
                data: psgCurso
            });

        } catch (e) {
            console.log(`Error: ${e}`);
            handleErrorResponse(res, 'Error al intenter consultar todos los registros de cursos psg', 500)
        }
    },

    async show(req, res) {

        try {
            const {id} = req.params


            return res.status(200).json({
                code: 200,
                success: true,
                id
            });

        } catch (e) {
            console.log(`Error: ${e}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los usuarios'
            });
        }
    },

    async store(req, res) {
        try {
            const bodyClean = matchedData(req)

            /**
             * ruta para el directorio de portada del curso
             */
            const pathDirectoryPortada = path.join(__dirname, './../storage/psg-curso/')

            /**
             * crear ruta para almacenar archivo de la portada del curso
             */
            if (!createDirectory(pathDirectoryPortada)) {
                return handleErrorResponse(res, 'Error al intentar crear el directorio para almacenar la portada de un curso', 500)
            }

            /**
             * verificar si existe algun archivo
             */
            if (!req.files || Object.keys(req.files).length === 0) {
                return handleErrorResponse(res, 'No se ha seleccionado ningun archivo', 400)
            }

            /**
             * validar que exista un archivo para la portada del curso
             */
            if (!req.files.portada_curso) {
                return handleErrorResponse(res, 'No se ha seleccionado ningun archivo para la portada del curso', 400)
            }

            //region:: verificar si el id de configuracion de un curso ya esta registrado en la tabla psg_cursos
            const psgCursoShow = await db.CursoPsg.findOne({
                where: {
                    configuracion_curso_id: bodyClean.configuracion_curso_id
                }
            })

            if (psgCursoShow) {
                return handleErrorResponse(res, 'el id de los detalles o configuracion del curso ya esta registrado en el curso psg', 409)
            }
            //endregion

            //region:: cuando solo selecciona el un archivo para el banner del curso

            // console.log('solo tiene el banner')
            const filePortadaCurso = req.files.portada_curso

            /**
             * sacar la extencion del archivo de la portada de curso
             * @type {T}
             */
            const extensionFile = filePortadaCurso.name.split('.').pop()

            /**
             * validar la extension del archivo del banner de curso con el array de validaciones de banner de curso
             */

            if (!extensionValid(['jpg', 'jpeg', 'png', 'gif'], extensionFile)) {
                return handleErrorResponse(res, 'El archivo solo permite archivos de tipo \'jpg\', \'jpeg\', \'png\', \'gif\' ', 400)
            }

            /**
             * generar el nombre del archivo
             * @type {string}
             */
            const nameFile = `${uuidv4()}.${extensionFile}`

            const pathFilePortadaCurso = `${pathDirectoryPortada}/${nameFile}`

            /**
             * mover el archivo de portada de curso a la carpeta de almacenamiento
             */
            filePortadaCurso.mv(pathFilePortadaCurso, async (err) => {
                if (err) {
                    console.log(err)
                    // return handleErrorResponse(res, 'Error al intentar mover el archivo de la portada de curso', 500)
                }

                /**
                 * guardar registro del curso
                 */
                try {
                    await db.CursoPsg.create({
                        nombre_curso: bodyClean.nombre_curso,
                        version: bodyClean.version,
                        portada_curso: nameFile,
                        configuracion_curso_id: bodyClean.configuracion_curso_id,
                        estado: 'REGISTRADO',
                        created_at: fechaYHora,
                        updated_at: fechaYHora,
                        user_created: null
                    }, {
                        fields: [
                            'nombre_curso',
                            'version',
                            'portada_curso',
                            'configuracion_curso_id',
                            'estado',
                            'created_at',
                            'updated_at',
                            'user_created'
                        ]
                    })
                } catch (e) {
                    console.log('Error create sequelize :', e);

                    return res.status(500).json({
                        code: 500,
                        success: false,
                        message: 'Error al intentar ejecutar create en sequelize de cursos psg'
                    })
                }


                return res.status(200).json({
                    code: 200,
                    success: true,
                    message: 'Curso psg registrado con exito + portada'
                })

            })
            //endregion


        } catch (e) {
            console.log(`Error: ${e}`)
            handleErrorResponse(res, 'Error al intenter guardar un curso psg', 500)
        }
    },

    async update(req, res) {
        try {
            /**
             * recuperar el parametro {id} de la url de la peticion
             */
            const {id} = req.params
            /**
             * recuperar el body de la peticion
             */
            const bodyClean = matchedData(req)

            /**
             * ruta para el directorio de portada del curso
             */
            const pathDirectoryPortada = path.join(__dirname, './../storage/psg-curso/')

            //region:: verificar si existe el curso psg id para poder actualizar

            /**
             * consultar datos existentes con el id
             */
            const cursoPsgShow = await db.CursoPsg.findOne({
                where: {
                    curso_id: id,
                    estado: 'REGISTRADO'
                }
            })

            /**
             * verificar si el id del curso existe
             */
            if (!cursoPsgShow) {
                return handleErrorResponse(res, 'El id del curso psg no existe para actualizar', 404)
            }
            //endregion

            //region:: procedimiento para verificar que no tenga un duplicado de id de configuracion_curso_id en la tabla psg_cursos

            const verifyConfiguracionCurso = await db.CursoPsg.findOne({
                where: {
                    configuracion_curso_id: bodyClean.configuracion_curso_id,
                    estado: 'REGISTRADO'
                }
            })

            if (verifyConfiguracionCurso) {
                if (verifyConfiguracionCurso.configuracion_curso_id == bodyClean.configuracion_curso_id) {

                }
            }

            //endregion


            /**
             * verificar si existe algun archivo y acttualizar los campos req.body
             */
            if (!req.files || Object.keys(req.files).length === 0) {
                /**
                 * si no esta seleccionado ningun archivo guardar los campos en la base de datos
                 */

                await db.CursoPsg.update({
                    nombre_curso: bodyClean.nombre_curso,
                    version: bodyClean.version,
                    // portada_curso: nameFile,
                    configuracion_curso_id: bodyClean.configuracion_curso_id,
                    estado: 'REGISTRADO',
                    updated_at: fechaYHora
                }, {
                    where: {
                        curso_id: id
                    }
                })

                return res.status(200).json({
                    code: 200,
                    success: true,
                    message: 'Registro de curso psg actualizado con exito'
                })
            }

            //region:: proceso para actualizar el archivo de portada del curso y los campos body


            //endregion


            res.status(200).json({
                code: 200,
                success: true,
                cursoPsgShow,
                message: 'se actualizo el cursos psg correctamente + portada'
            });


        } catch
            (e) {
            console.log(`Error: ${e}`);
            handleErrorResponse(res, 'Error al intentar actualizar un curso psg', 500)
        }
    }
    ,

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
    }
    ,

}
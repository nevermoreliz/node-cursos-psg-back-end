const db = require("../models")

/**
 * index -> mostrar todos los registros
 * show/{id} -> monstrar un registro
 * store -> guardar un registro
 * update/{id} -> actualizar un registro
 * delete/{id} -> eliminar un registro
 **/


module.exports = {
    async index(req, res, next) {

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

    async show(req, res, next) {

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

    async store(req, res, next) {
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

    async update(req, res, next) {
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

    async delete(req, res, next) {
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
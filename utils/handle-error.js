/**
 * @description manejo de errores Http
 * @param res
 * @param e :error que envia por el cath
 * @param code
 * @returns {*} -> jsonError
 */
const handleHttpError = (res, e, code) => {

    console.log("Error", e)

    res.status(code).json({
        code,
        success: false,
        message: e.toString()
    });

}

/**
 * @description manejo de errores con mensaje personalisado
 * @param res
 * @param message :mensaje para enviar
 * @param code
 * @returns {*}
 */
const handleErrorResponse = (res, message = "Algo Ocurrio", code = 401) => {
    // console.log("Error handle error response:", message)


    try {
         res.status(code).json({
            code,
            success: false,
            message: message
        })
    } catch (e) {
        console.log("Error helper handle error response:", e)

        // return response.status(500).json({
        //     code:500,
        //     success: false,
        //     message: 'Error en el helper manejo de errores'
        // })
    }

}

module.exports = {handleHttpError, handleErrorResponse}
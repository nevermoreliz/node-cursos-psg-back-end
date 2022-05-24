const fs = require('fs');

/**
 * crear un directorio si no existe
 * @param path
 */
const createDirectory = (path) => {
    if (!fs.existsSync(path)) {
        // console.log('no existe el directorio')
        fs.mkdir(path, {recursive: true}, (e) => {
            if (e) {
                console.log('Error :', e)
                return false
                // return handleErrorResponse(res, messageError, 500)
            } else {
                console.log(`Se creo el directorio  | ${path} | el ${new Date()}`)
                return true
            }
        })
    }
    return true
}

const deleteFile = (path) => {
    if (fs.existsSync(path)) {

        /**
         * eliminar archivo anterior
         */
        fs.unlinkSync(path)
    }
}

module.exports = {createDirectory, deleteFile}
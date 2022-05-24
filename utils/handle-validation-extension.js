/**
 * validacion de extencion de archivo
 * @param arrayValid -> debe de resivir un arreglo con los datos de la validacion
 * @param extensionFile -> extension del archivo a validar
 */
const extensionValid = (arrayValid, extensionFile) => {
    if (!arrayValid.includes(extensionFile)) {
        return false;
    }
    return true
}

module.exports = {extensionValid};
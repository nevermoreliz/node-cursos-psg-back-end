const bcryptjs = require('bcryptjs')
/**
 * @description contraseña sin encriptar
 * @param passwordPlain
 * @returns {contraseña cifrada con bcryptjs}
 */
const encrypt = async (passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 10)
    return hash
}
/**
 * @description pasar contraseña sin encriptar y pasar contrasela encriptada
 * @param passwordPlain
 * @param hashPassword
 * @returns {Promise<void>}
 */
const compare = async (passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword)
}

module.exports = {encrypt, compare}
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

/**
 * Debes de pasar el objeto del usuario
 * @param dataPayload
 * @returns {Promise<void>}
 */
const tokenSing = async (dataPayload) => {
    const Sing = jwt.sign(
        {
            usuario_id: dataPayload.usuario_id,
            participante_id: dataPayload.participante_id
        },
        JWT_SECRET,
        {
            expiresIn: '2h'
        }
    )

    return Sing

}

/**
 * Debes de pasarel token de session de JWT
 * @param tokenJwt
 * @returns {Promise<null>}
 */
const verifyToken = async (tokenJwt) => {

    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (e) {
        return null
    }

}

module.exports = {
    tokenSing,
    verifyToken
}
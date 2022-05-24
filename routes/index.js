const express = require("express")
const router = express.Router()

/**
 * poner aqui las rutas
 */

router.use('/auth', require('./auth.route'))
router.use('/rol', require('./rol.route'))
router.use('/usuario', require('./usuario.route'))
router.use('/participante', require('./participante.route'))
router.use('/configuracion-curso', require('./configuracion-curso.route'))
router.use('/psg-curso', require('./psg-curso.route'))

// router.use('/storage', require('./storage'))

module.exports = router;
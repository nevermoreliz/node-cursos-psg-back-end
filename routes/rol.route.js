const express = require('express')
const router = express.Router()

const RolController = require('../controllers/rol.controller')

router.get('/', RolController.index)
router.get('/{id}', RolController.show)
router.post('/', RolController.store)
router.put('/{id}', RolController.update)
router.put('/{id}', RolController.delete)

module.exports = router
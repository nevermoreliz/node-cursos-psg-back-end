const {validationResult} = require('express-validator')

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (e) {
        console.log('Error: ', e)
        res.status(403).json({
            code: 403,
            success: false,
            errors: e.array()
        })
    }
}

module.exports = {validateResult}
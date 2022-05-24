require("dotenv").config()
const express = require('express')
const cors = require("cors")
const app = express()

const morganBody = require('morgan-body')
const loggerStream = require("./utils/handle-logger");

/**
 * configuracion de morgan para mandar errores a la consola
 * y a slack
 */
morganBody(app, {
    noColors: true,
    stream: loggerStream,
    skip: function (req, res) {
        return res.statusCode < 400
    }
})

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(`./storage`))

/**
 * Aqui invocamos a las rutas
 */
app.use('/api', require('./routes'));


app.listen(PORT, () => {
    console.log('Tu app esa lista por el http://localhost:' + PORT);
});


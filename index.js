const express   = require('express');
const cors      = require('cors')
const routerApi = require('./routes')
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')
const port = process.env.PORT || 3000

const app = express()

app.use(express.json()) // gracias a esto puedo recibir info json desde un POST

const whiteList = ['http://localhost:8080', 'https://victorbarilin.com']
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options)) // si no uso cors solo pueden usar esta api desde el mismo servidor y puerto, para dar acceso utilizo cors, y para limitar el acceso a algunos clientes devo pasar options

// route --- uso las rutas de la carpeta routes para no tener todo en esete archivo
routerApi(app)

// middlewares (deben estar despues de definir la ruta)
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

// puerto por el que escucha peticiones
app.listen(port, () => {

  console.log('App run in port:', port)

})



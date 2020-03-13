//key.js decidi que variables retorno

if (process.env.NODE_ENV === 'production') {
  //en producción
  module.exports = require ('./prod');
} else {
  //en desarrollo
  module.exports = require ('./dev');
}

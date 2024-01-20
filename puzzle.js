// Snippets de código para poder componer el programa



// app.js

//Usado?: Sí 
const express = require('express');
//--- Explicación: Carga la dependencia express
// -------------------------------------------------------------------------------

//Usado?: Sí
const app = express();
//--- Explicación: Inicia express
// -------------------------------------------------------------------------------------

//Usado?: Sí
const PORT = 4000;
//--- Explicación: Puerto por el que el servidor escucha las peticiones
// -------------------------------------------------------------------------------------

//Usado?: Sí
const bodyParser = require('body-parser');
//--- Explicación: Carga la dependencia body-parser
// -------------------------------------------------------------------------------------

//Usado?: Sí
const session = require('express-session');
//--- Explicación: Carga la dependencia express-session
// -------------------------------------------------------------------------------------

//Usado?: Sí
const dotenv = require('dotenv');
//--- Explicación: Carga la dependencia dotenv
// -------------------------------------------------------------------------------------

//Usado?: Sí
dotenv.config();
//--- Explicación: Carga las variables de entorno definidas en el archivo .env (PALABRA_SECRETA)
// -------------------------------------------------------------------------------------

//Usado?: Sí
const middlewares = require('./middlewares');
//--- Explicación: Importa middleware a app.js
// -------------------------------------------------------------------------------------

//Usado?: Sí
const routes = require('./routes');
//--- Explicación: Importa routes a app.js
// -------------------------------------------------------------------------------------

//Usado?: Sí
routes.setup(app);
//--- Explicación: Ejecuta la función setup de routes.js pasándole el argumento app. Al hacer esto, vemos la página de inicio al ejecutar app.js
// -------------------------------------------------------------------------------------

//Usado?: Sí
app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: Hace una petición get desde /profile al servidor y usa el middleware para verificar si hay una sesión iniciada. Si la encuentra, devuelve el res.send('...') indicado.
// -------------------------------------------------------------------------------------

//Usado?: Sí
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: Levanta el servidor, a partir de ahora puede escuchar las peticiones por el puerto especificado.
// -------------------------------------------------------------------------------------



// middlewares.js

//Usado?: Sí
const bodyParser = require('body-parser');
//--- Explicación: Carga la dependencia body-parser
// -------------------------------------------------------------------------------------

//Usado?: Sí
const session = require('express-session');
//--- Explicación: Carga la dependencia express-session
// -------------------------------------------------------------------------------------

//Usado?: Sí
const dotenv = require('dotenv');
//--- Explicación: Carga la dependencia dotenv
// -------------------------------------------------------------------------------------

//Usado?: Sí
dotenv.config();
//--- Explicación: Carga las variables de entorno definidas en el archivo .env (PALABRA_SECRETA)
// -------------------------------------------------------------------------------------

//Usado?: Si
const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || '';

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect('/?error=1');
  }
};
//--- Explicación: Comprueba que la palabra introducida coincide con PALABRA_SECRETA del archivo .env. Si coinciden, introduce en req.session la key palabraSecreta con value palabraCorrecta. Si no coinciden, redirige a /?error=1 (Palabra incorrecta)
// -------------------------------------------------------------------------------------

//Usado?: Sí
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: Verifica si hay una sesión iniciada ya. Si req.session.palabraSecreta existe, pasa el middleware; si no existe redirige a /?error=2 (No estás logado)
// -------------------------------------------------------------------------------------

//Usado?: Sí
const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};
//--- Explicación:
// -------------------------------------------------------------------------------------

//Usado?: Sí
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación: Exporta las tres funciones de middlewares.js para usarlas en otros scripts
// -------------------------------------------------------------------------------------



// routes.js

//Usado?: Sí
const middlewares = require('./middlewares');
//--- Explicación: Importa middlewares.js para usarlo en routes.js
// -------------------------------------------------------------------------------------

//Usado?: Sí
const setup = (app) => {
  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
      : '';
    if (req.session.palabraSecreta) {
      return res.redirect('/profile');
    }
    //Aquí va código dentro
  })
}
//--- Explicación: Hace una petición get de la página de inicio. Como se usa también como endpoint de varias redirecciones, incluye ternarios e if para mostrar los errores 1 y 2 de middleware.js y comprueba si hay una sesión iniciada.
// -------------------------------------------------------------------------------------

//Usado?: Sí
res.send(`
  <html>
    <body>
      <h1>Página de Inicio</h1>
      <p>${mensajeError}</p>
      <form method="post" action="/profile">
        <label for="palabra">Introduce la palabra:</label>
        <input type="text" name="palabra" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
  </html>
`);
//--- Explicación: Esta es la página de inicio que aparece nada más iniciar el servidor (porque hace un res.send('...')) y a esta página redirigen los errores 1 y 2 de las funciones de middleware.js 
// -------------------------------------------------------------------------------------

//Usado?: Sí
module.exports = {
  setup,
};
//--- Explicación: Exporta setup para usarlo en app.js
// -------------------------------------------------------------------------------------







// SIN EXPLICAR

//Usado?: Sí
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: 
// -------------------------------------------------------------------------------------

//Usado?: Sí
middlewares.setupAPP(app);
//--- Explicación: Errata setupApp() --> setupAPP(). Accede a la función setupAPP de middlewares.js. Esta función hace falta aquí porque 
// -------------------------------------------------------------------------------------


//Usado?: Sí
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});
//--- Explicación: 
// -------------------------------------------------------------------------------------

//Usado?: Sí
app.use(bodyParser.urlencoded({ extended: true }));
//--- Explicación: Parsea el body de la petición que se haga
// -------------------------------------------------------------------------------------

//Usado?: Sí
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));
//--- Explicación: 
// -------------------------------------------------------------------------------------

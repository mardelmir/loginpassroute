// Snippets de código para poder componer el programa

//Usado?: Sí
const express = require('express');
//--- Explicación: Requerir express
// -------------------------------------------------------------------------------

//Usado?: Sí
const middlewares = require('./middlewares');
//--- Explicación: Importamos middleware a app.js
// -------------------------------------------------------------------------------------

//Usado?: Sí
const routes = require('./routes');
//--- Explicación: Importamos routes a app.js
// -------------------------------------------------------------------------------------

//Usado?: Sí
const app = express();
//--- Explicación: Inicializamos express
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
//--- Explicación: Validar una palabra en el middleware
// -------------------------------------------------------------------------------------

//Usado?: Sí
const PORT = 4000;
//--- Explicación: Puerto por el que el servidor escucha las peticiones
// -------------------------------------------------------------------------------------

//Usado?: Sí
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: Iniciamos el servidor, a partir de ahora puede escuchar las peticiones
// -------------------------------------------------------------------------------------

//Usado?: Sí
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación: Exportamos las tres funciones de middlewares.js para usarlas en otros archivos
// -------------------------------------------------------------------------------------

//Usado?: Sí
module.exports = {
  setup,
};
//--- Explicación: Exportamos setup para usarlo en app.js
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
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: Sí
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: 

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
const dotenv = require('dotenv');
//--- Explicación:
// -------------------------------------------------------------------------------------

//Usado?: Sí
dotenv.config();
//--- Explicación:
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
//--- Explicación:
// -------------------------------------------------------------------------------------

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
//--- Explicación: Errata setupApp --> setupAPP. Accede a la función setupAPP de middlewares.js
// -------------------------------------------------------------------------------------

//Usado?: Sí
const bodyParser = require('body-parser');
//--- Explicación: 
// -------------------------------------------------------------------------------------

//Usado?: Sí
const session = require('express-session');
//--- Explicación:
// -------------------------------------------------------------------------------------


//Usado?: Sí
const middlewares = require('./middlewares');
//--- Explicación:
// -------------------------------------------------------------------------------------

//Usado?: Sí
routes.setup(app);
//--- Explicación: 
// -------------------------------------------------------------------------------------

//Usado?: Sí
routes.setup(app);
//--- Explicación: 
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
const session = require('express-session');
//--- Explicación:
// -------------------------------------------------------------------------------------

//Usado?: Sí
const dotenv = require('dotenv');
//--- Explicación:
// -------------------------------------------------------------------------------------

//Usado?: Sí
dotenv.config();
//--- Explicación:
// -------------------------------------------------------------------------------------

//Usado?: Sí
const bodyParser = require('body-parser');
//--- Explicación:
// -------------------------------------------------------------------------------------

//Usado?: Sí
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: 
// -------------------------------------------------------------------------------------

//Usado?: Sí
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación: 
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
//--- Explicación: 
// -------------------------------------------------------------------------------------

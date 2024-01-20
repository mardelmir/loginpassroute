const express = require('express');
const app = express();
const PORT = 4000;

const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const middlewares = require('./middlewares');
const routes = require('./routes');

middlewares.setupAPP(app);
routes.setup(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));

app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
    res.send(`
      <h1>Ruta del Perfil</h1>
      <form method="post" action="/logout">
        <button type="submit">Log Out</button>
      </form>
    `);
});

app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
    res.send(`
      <h1>Ruta del Perfil (Sesión activa)</h1>
      <form method="post" action="/logout">
        <button type="submit">Log Out</button>
      </form>
    `);
  });

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
        }
        res.redirect('/');
    });
});


app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
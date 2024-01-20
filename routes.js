const middlewares = require('./middlewares');

const setup = (app) => {
    app.get('/', (req, res) => {
        const mensajeError = req.query.error
            ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
            : '';
        if (req.session.palabraSecreta) {
            return res.redirect('/profile');
        }
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
            </html>`);
    })
}


module.exports = {
    setup,
};

const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/html', (req, res) => {
  const url = req.query.url;
  if(!url) return res.send(404);

  fetch(url)
    .then(response => response.text())
    .then(html => {
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Visualizador de páginas</title>
        </head>
        <body>
          <div>${html}</div>
        </body>
        </html>
      `);
    })
    .catch((err) => {
        res.send(404);
    });
});

app.get('/', (req, res) => {
    res.sendFile(`${process.cwd()}/pages/index.html`);
  });

app.use((req, res) => {
    res.redirect('/');
  });

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});

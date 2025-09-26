// keep_alive.js
const http = require('http');

function startServer() {
  const port = process.env.PORT || 3000;

  http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Bot está online!");
  }).listen(port, () => {
    console.log(`Servidor HTTP ativo na porta ${port}`);
  });
}

module.exports = startServer;

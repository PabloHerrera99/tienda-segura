const express = require("express");
// Sin rutas que cambien estado ni auth por cookies: CSRF no aplica.
const app = express(); // nosemgrep: javascript.express.security.audit.express-check-csurf-middleware-usage.express-check-csurf-middleware-usage

const total = (precio, cant, desc) =>
  precio * cant * (1 - desc);

app.get("/total", (req, res) => {
  const { p, c } = req.query;
  res.json({ total: total(p, c, 0) });
});

app.get("/calcular", (req, res) => {
  const resultado = Number(req.query.a) + Number(req.query.b);
  res.json({ resultado });
});

module.exports = { app, total };

// Solo levanta el servidor con "node app.js", no cuando lo importa el test
if (require.main === module) {
  app.listen(3000, () => console.log("Escuchando en http://localhost:3000"));
}

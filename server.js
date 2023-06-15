const express = require("express");
const app = express();
const port = 8080;

// Importe o módulo db.js para lidar com a conexão com o banco de dados
const { connect } = require("./config/db");

// Importe o módulo de rotas para advogados
  const advogadosRouter = require("./routes/advogados");
  const clientesRouter = require("./routes/cliente");
  const processosRouter = require("./routes/processos");
  const partesRouter = require("./routes/partes");

// Conecte-se ao banco de dados
connect()
    .then(() => {
      // Defina a rota para advogados
      app.use("/advogados", advogadosRouter);

      // Defina a rota para clientes
      app.use("/clientes", clientesRouter);

      // Defina a rota para processos
      app.use("/processos", processosRouter);

      // Defina a rota para partes
      app.use("/partes", partesRouter);

      // Inicie o servidor
      app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
      });
    })
    .catch((error) => {
      console.error("Failed to connect to the database:", error);
    });

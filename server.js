const express = require("express");
const app = express();
const port = 8080;

// Importe o módulo db.js para lidar com a conexão com o banco de dados
const { connect } = require("./config/db");

// Importe o módulo de rotas para advogados
  const advogadosRouter = require("./routes/advogados");

// Conecte-se ao banco de dados
connect()
    .then(() => {
      // Defina a rota para advogados
      app.use("/advogados", advogadosRouter);

      // Inicie o servidor
      app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
      });
    })
    .catch((error) => {
      console.error("Failed to connect to the database:", error);
    });

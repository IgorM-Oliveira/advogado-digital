require("dotenv-safe").config();

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

// Importe o módulo db.js para lidar com a conexão com o banco de dados
const { connect } = require("./config/db");

// Importe o módulo de rotas para advogados
const authRouter = require("./routes/auth");
const advogadosRouter = require("./routes/advogados");
const clientesRouter = require("./routes/cliente");
const processosRouter = require("./routes/processos");
const partesRouter = require("./routes/partes");
const movimentacoesRouter = require("./routes/movimentacoes");

// Conecte-se ao banco de dados
connect()
    .then(() => {
        // Configure o body-parser para tratar dados JSON e urlencoded
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        // Defina a rota para login
        app.use("/login", authRouter);

        // Defina a rota para advogados
        app.use("/advogados", advogadosRouter);

        // Defina a rota para clientes
        app.use("/clientes", clientesRouter);

        // Defina a rota para processos
        app.use("/processos", processosRouter);

        // Defina a rota para partes
        app.use("/partes", partesRouter);

        // Defina a rota para movimentacoes
        app.use("/movimentacoes", movimentacoesRouter);

        // Inicie o servidor
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error);
    });

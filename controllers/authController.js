const Advogado = require("../models/advogadoModel");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// Rota para login
exports.login = async (req, res) => {
    const {user, senha} = req.body;
    try {
        const advogado = await Advogado.buscarPorNumeroEsenha(user, senha);

        if (advogado) {
            const payload = {nome: advogado.nome, id: advogado.id};

            const token_validator = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

            res.json({ status: 201, authTokens: token_validator });
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro ao autenticar advogado:', error);
        res.status(500).json({ error: 'Erro ao autenticar advogado' });
    }
};
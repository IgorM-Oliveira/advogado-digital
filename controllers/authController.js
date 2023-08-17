const Advogado = require("../models/advogadoModel");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// Rota para login
exports.login = async (req, res) => {
    const {user, senha} = req.body;
    try {
        const advogado = await Advogado.buscarPorNumeroEsenha(user, senha);

        if (advogado) {
            const payload = req.body;

            const token_validator = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

            res.json({ token: token_validator });
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro ao autenticar advogado:', error);
        res.status(500).json({ error: 'Erro ao autenticar advogado' });
    }
};
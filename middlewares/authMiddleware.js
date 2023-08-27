const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    const data = token.split(' ')

    if (!data[1]) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido' });
    }

    jwt.verify(data[1], jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.userId = decoded.id;
        next();
    });
};

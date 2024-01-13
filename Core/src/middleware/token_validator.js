const jwt = require('jsonwebtoken')
require('dotenv').config();

// Verificacion de token para validar que el usuario esta loggeado para entrar a rutas protegidas
const verifyToken = (req, res, next) => {
    const token = req.header('token')
    if (!token) return res.status(403).json({ error: 'Acceso denegado, falta token' })
    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN)
        decodedToken = jwt.decode(token)
        req.header['id'] = decodedToken.id
        req.user = verified
        next() 
    } catch (error) {
        res.status(403).json({error: `token no es válido, ${error}`})
    }
}

module.exports = verifyToken;
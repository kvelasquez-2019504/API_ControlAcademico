const { request, response } = require('express');
const tieneRol = (...roles) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: "Se quiere verificar un rol sin validar token"
            });
        }
        if (!roles.includes(req.usuario.rol)) {
            return res.status(400).json({
                msg: `Este endpoint necesita un rol de la siguiente lista ${roles}`
            });
        }
        next();
    }
}

module.exports = {
    tieneRol
}

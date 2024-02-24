const jwt =require("jsonwebtoken");
const Maestro = require("../models/maestros");
const Estudiante = require("../models/estudiante");
const validarJWT = async (req,res,next)=>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg:"No hay token"
        });
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const maestro = await Maestro.findOne({_id:uid});
        const estudiante = await Estudiante.findOne({_id:uid});

        if(!maestro && !estudiante){
            return res.status(400).json({
                msg: "El usuario no existe"
            })
        }

        if(maestro){
            if(!maestro.estado){
                return res.status(400).json({
                    msg:"Token valido, usuario con estado false"
                })
            }
            req.usuario= maestro;
        }
        if(estudiante){
            if(!estudiante.estado){
                return res.status(400).json({
                    msg:"Token valido, usuario con estado false"
                })
            }
            req.usuario= estudiante;
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:"Token no valido"
        });
    }
}

module.exports={
    validarJWT
}
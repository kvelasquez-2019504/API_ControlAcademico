const { response } = require("express");
const Estudiante = require("../models/estudiante");
const Maestro = require("../models/maestros");

const login = async(req, res = response)=>{
    const {correo, password}= req.body;
    try {
        //verificar correo
        const estudiante = await Estudiante.findOne({correo});
        const maestro = await Maestro.findOne({correo});
        if(!maestro){
            return res.status(400).json({
                msg:"El correo no pertenece a ningún profesor"
            });
        }
        if(!estudiante){
            return res.status(400).json({
                msg:"El correo no pertenece a ningún estudiante"
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Comuniquese con el administrador"
        });
    }
}

module.exports= {
    login
}
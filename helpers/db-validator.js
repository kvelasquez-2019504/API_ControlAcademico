const Estudiante = require('../models/estudiante');

const existeEmailEstudiante = async (correo="")=>{
    const existeEmail = await Estudiante.findOne({correo});
    if(existeEmail){
        throw new Error(`El email ${correo} ya está registrado`);
    }
}

module.exports={
    existeEmailEstudiante
}
const {response,json}= require('express');
const Maestro =require('../models/maestros');

const maestrosPost=async(req,res=response)=>{
    const { nombres, apellidos, correo, grado, edad,cursos, estado } = req.body;
    const maestro = new Maestro({ nombres, apellidos, correo, grado, edad, cursos, estado });
    await maestro.save();
    res.status(200).json({
        maestro
    });
}

module.exports={maestrosDelete,
    maestrosPut,
    maestrosPost,
    maestrosGetById,
    maestrosGet
}
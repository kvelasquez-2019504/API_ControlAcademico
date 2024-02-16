const {response,json}= require('express');
const Maestro =require('../models/maestros');

const maestrosGet= async (req,res = response)=>{
    const {limite, desde} = req.query;
    const query = {estado:true};
    const [total, maestros] = await Promise.all([
        Maestro.countDocuments(query),
        Maestro.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.status(200).json({
        total, 
        maestros
    });
}

const maestrosPost=async(req,res=response)=>{
    const { nombres, apellidos, correo, grado, edad,cursos, estado } = req.body;
    const maestro = new Maestro({ nombres, apellidos, correo, grado, edad, cursos, estado });
    await maestro.save();
    res.status(200).json({
        maestro
    });
}

module.exports={maestrosPost,
    maestrosGet
}
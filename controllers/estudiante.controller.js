const {response,json} = require('express');
const Estudiante = require('../models/estudiante');

const estudiantesGet = async (req,res=response)=>{
    const {limite, desde}=req.query;
    const query = {estado:true};
    
    const [total, estudiantes]= await Promise.all([
        Estudiante.countDocuments(query),
        Estudiante.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.status(200).json({
        total,
        estudiantes
    });
}
module.exports={
    estudiantesGet
}
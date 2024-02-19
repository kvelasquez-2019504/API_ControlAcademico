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

const maestrosGetById = async (req,res=response)=>{
    const {id}=req.params;
    const maestro = await Maestro.findOne({_id:id});
    res.status(200).json({
        maestro
    });
} 

const maestrosPut = async (req,res=response)=>{
    const {id}=req.params;
    const {_id,estado,grado,correo,...resto}=req.body;
    await Maestro.findByIdAndUpdate(id,resto);
    const maestroNew = await Maestro.findOne({_id:id});
    res.status(200).json({
        msg:"Se ha actualizado el maestro",
        maestroNew
    });
} 

const maestrosDelete = async(req,res=response)=>{
    const {id}=req.params;
    await Maestro.findByIdAndUpdate(id,{estado:false});
    const maestro = await Maestro.findOne({_id:id});
    res.status(200).json({
        msg:"Se ha eliminado el maestro",
        maestro
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

module.exports={maestrosDelete,
    maestrosPut,
    maestrosPost,
    maestrosGetById,
    maestrosGet
}
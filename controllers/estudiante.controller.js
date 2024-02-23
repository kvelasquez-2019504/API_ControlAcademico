const { response, json } = require('express');
const Estudiante = require('../models/estudiante');

const estudiantesGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, estudiantes] = await Promise.all([
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

const estudiantesGetById = async (req,res=response)=>{
    const {id}=req.params;
    const estudiante = await Estudiante.findOne({_id:id});
    res.status(200).json({
        estudiante
    });
}

const estudiantesPut = async (req,res=response)=>{
    const {id}=req.params;
    const {_id,estado,grado,correo,cantidadCursos,curso1,curso2,curso3,...resto}=req.body;
    await Estudiante.findByIdAndUpdate(id,resto);
    const estudianteNew = await Estudiante.findOne({_id:id});
    res.status(200).json({
        msg:"Se ha actualizado el estudiante",
        estudianteNew
    });
}

const estudiantesDelete = async (req, res=response)=>{
    const {id}=req.params;
    await Estudiante.findByIdAndUpdate(id,{estado:false});
    const estudiante = await Estudiante.findOne({_id:id});
    res.status(200).json({
        msg:"Se ha eliminado el estudiante",
        estudiante
    });
}

const verMisCursos=async(req,res=response)=>{
    
}

const estudiantesPost = async (req, res = response) => {
    const { nombres, apellidos, correo, password,cursos} = req.body;
    const estudiante = new Estudiante({ nombres, apellidos, correo, password,cursos});
    let cantCursos= estudiante.cursos.length;
    //await estudiante.save();
    res.status(200).json({
        estudiante,
        cantCursos
    });
}

module.exports = {verMisCursos,
    estudiantesDelete,
    estudiantesPut,
    estudiantesPost,
    estudiantesGetById,
    estudiantesGet
}
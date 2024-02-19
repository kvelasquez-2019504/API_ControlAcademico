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

const asignarEstudianteACurso= async(req,res=response)=>{
    const {id}=req.params;
    const {_id,nombres,apellidos,correo,grado,edad,estado,...resto}=req.body;
    let numeroCursos = 0;
    if (resto.curso1) {
        numeroCursos += 1;
    }
    if (resto.curso2) {
        numeroCursos += 1;
    }
    if (resto.curso3) {
        numeroCursos += 1;
    }
    resto.cantidadCursos=numeroCursos;
    await Estudiante.findByIdAndUpdate(id,resto);
    const estudianteNew = await Estudiante.findOne({_id:id});
    res.status(200).json({
        msg:"El estudiante pudo asignarse a nuevo/os cursos",
        estudianteNew
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
    const estudianteEliminado = req.estudiante;
    res.status(200).json({
        msg:"Se ha eliminado el estudiante",
        estudiante,
        estudianteEliminado
    });
}

const verMisCursos=async(req,res=response)=>{
    const {id} = req.params;
    const estudiante= await Estudiante.findOne({_id:id});
    const curso1= estudiante.curso1;
    const curso2 = estudiante.curso2;
    const curso3 = estudiante.curso3
    res.status(200).json({
        msg:"Tus cursos son:",
        curso1,curso2,curso3
    });
}

const estudiantesPost = async (req, res = response) => {
    const { nombres, apellidos, correo, grado, edad, curso1, curso2 = "", curso3 = "", estado } = req.body;
    let numeroCursos = 0;
    if (curso1) {
        numeroCursos += 1;
    }
    if (curso2) {
        numeroCursos += 1;
    }
    if (curso3) {
        numeroCursos += 1;
    }
    cantidadCursos = numeroCursos
    const estudiante = new Estudiante({ nombres, apellidos, correo, grado, edad, cantidadCursos, curso1, curso2, curso3, estado });
    await estudiante.save();
    res.status(200).json({
        estudiante
    });
}

module.exports = {verMisCursos,
    estudiantesDelete,
    estudiantesPut,
    asignarEstudianteACurso,
    estudiantesPost,
    estudiantesGetById,
    estudiantesGet
}
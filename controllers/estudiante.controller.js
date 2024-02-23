const { response } = require('express');
const bcrypt = require("bcryptjs");
const Curso = require("../models/curso");
const Estudiante = require('../models/estudiante');

const estudiantesPut = async (req,res=response)=>{
    const {id}=req.params;
    const {_id,estado,rol,correo,...resto}=req.body;
    const salto = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(resto.password,salto);
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
    const {id}= req.params;
    const {nombres,apellidos, cursos}= await Estudiante.findOne({_id:id});
    let listaCursos =[];
    for(let idCurso of cursos){
        const cursoBuscado = await Curso.findOne({_id:idCurso});
        listaCursos.push(cursoBuscado.nombre);
    }
    res.status(200).json({
        nombres,apellidos,
        listaCursos
    });
}

const estudiantesPost = async (req, res = response) => {
    const { nombres, apellidos, correo, password,cursos} = req.body;
    const estudiante = new Estudiante({ nombres, apellidos, correo, password,cursos});
    const salto = bcrypt.genSaltSync();
    estudiante.password = bcrypt.hashSync(password,salto);
    await estudiante.save();
    res.status(200).json({
        estudiante
    });
}

module.exports = {verMisCursos,
    estudiantesDelete,
    estudiantesPut,
    estudiantesPost
}
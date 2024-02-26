const {response,json}= require('express');
const bcrypt = require("bcryptjs");
const Curso = require('../models/curso')
const Maestro =require('../models/maestro');

const verMisCursos=async(req,res=response) =>{
    const {id} =req.usuario;
    const {nombres,apellidos,cursos} = await Maestro.findOne({_id:id});
    let misCursos=[];
    for(let idCurso of cursos){
        const curso = await Curso.findOne({_id:idCurso});
        misCursos.push({curso});
    }
    res.status(200).json({
        nombres,apellidos,
        misCursos
    });
}

const maestrosPut=async (req,res=response)=>{
    const {id}=req.usuario;
    const {_id,estado,rol,correo,...resto}=req.body;
    const salto = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(resto.password,salto);
    await Maestro.findByIdAndUpdate(id,resto);
    const maestroNew = await Maestro.findOne({_id:id});
    res.status(200).json({
        msg:"Se ha actualizado el maestro",
        maestroNew
    });
}

const maestrosPost = async (req, res = response) => {
    const { nombres, apellidos, correo, password,cursos} = req.body;
    const maestro = new Maestro({ nombres, apellidos, correo, password,cursos});
    const salto = bcrypt.genSaltSync();
    maestro.password = bcrypt.hashSync(password,salto);
    await maestro.save();
    res.status(200).json({
        maestro
    });
}

module.exports={verMisCursos,
    maestrosPost,
    maestrosPut
}
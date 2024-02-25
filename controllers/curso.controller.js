const { response, json } = require("express");
const Curso = require("../models/curso");
const Maestro = require("../models/maestro");

const cursosGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, cursos] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.status(200).json({
        total,
        cursos
    });
}

const existeCursoMaestro = async (req,res=response,next) => {
    const {idCurso}= req.params;
    const {id} =req.usuario;
    const {cursos} = await Maestro.findOne({_id:id});
    if(!cursos.includes(idCurso)){
        res.status(400).json({
            msg:`Usted no esta asignado al Curso con ID: ${idCurso}`
        });
    }else{
        for(let buscarIdCurso of cursos){
            if(buscarIdCurso==idCurso){
                return next();
            }
        }
    }
}

const cursosGetById = async (req, res = response) => {
    const { idCurso } = req.params;
    const curso = await Curso.findById({_id:idCurso});
    res.status(200).json({
        curso
    });
}

const cursosPost = async (req, res = response) => {
    const { nombre } = req.body;
    const curso = new Curso({ nombre });
    const userAutenticado = req.usuario;
    await curso.save();
    res.status(200).json({
        msg: "El curso se ha guardado",
        curso,
        userAutenticado
    });
}

const cursosPut = async (req, res = response) => {
    const { id } = req.params;
    const { nombre } = req.body;
    await Curso.findByIdAndUpdate(id, { nombre });
    const cursoNew = await Curso.findOne({ _id: id });
    res.status(200).json({
        msg: "Se ha actualizado el curso",
        cursoNew
    });
}

const cursosDelete = async (req, res = response) => {
    const { id } = req.params;
    await Curso.findByIdAndUpdate(id, { estado: false });
    const curso = await Curso.findOne({ _id: id });
    res.status(200).json({
        msg: "Se ha eliminado el curso",
        curso
    });
}

module.exports = {
    cursosDelete,
    cursosPut,
    cursosPost,
    existeCursoMaestro,
    cursosGetById,
    cursosGet
}
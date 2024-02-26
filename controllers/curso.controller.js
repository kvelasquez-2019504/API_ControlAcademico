const { response, json } = require("express");
const Curso = require("../models/curso");
const Maestro = require("../models/maestro");
const Estudiante = require("../models/estudiante");
let historialEstudiantes;

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
        return res.status(400).json({
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
    const { idCurso } = req.params;
    const { nombre } = req.body;
    await Curso.findByIdAndUpdate(idCurso, { nombre });
    const cursoNew = await Curso.findOne({ _id: idCurso });
    res.status(200).json({
        msg: "Se ha actualizado el curso",
        cursoNew
    });
}

const deleteCursoEstudiante =async(req,res,next)=>{
    const {idCurso} = req.params;
    const query = {estado:true};
    const [total,estudiantes]= await Promise.all([
        Estudiante.countDocuments(query),
        Estudiante.find({cursos:{$all:[idCurso]}})
    ]);
    for(let i=0;i<total;i++){
        historialEstudiantes=[];
        let arregloCursos=[];
        for(let estudiante of estudiantes ){
            for(let id of estudiante.cursos){
                if(id!=idCurso){
                    arregloCursos.push(id);
                }else{
                    historialEstudiantes.push([estudiante.id,estudiante.nombres,estudiante.apellidos]);
                }
            }
            await Estudiante.findByIdAndUpdate(estudiante.id,{cursos:arregloCursos});
            arregloCursos=[];
        }
    }
    return next();
}

const cursosDelete = async (req, res = response) => {
    const { idCurso } = req.params;
    await Curso.findByIdAndUpdate(idCurso, { estado: false });
    const curso = await Curso.findOne({ _id: idCurso });
    res.status(200).json({
        msg: `Se ha eliminado el curso ${idCurso}-${curso.nombre} y se eliminio de los estudiantes:`,
        historialEstudiantes
    });
}

module.exports = {deleteCursoEstudiante,
    cursosDelete,
    cursosPut,
    cursosPost,
    existeCursoMaestro,
    cursosGetById,
    cursosGet
}
const Curso = require('../models/curso');
const Estudiante = require('../models/estudiante');
const Maestro = require("../models/maestro");

const existeEmailEstudiante = async (correo = "") => {
    const existeEmail = await Estudiante.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El email ${correo} del estudiante ya está registrado`);
    }
}

const existenteEmailMaestro = async (correo = "") => {
    const existeEmail = await Maestro.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El email ${correo} ya está registrado`);
    }
}

const existeCursoById = async (id = '') => {
    const existeCurso = await Curso.findOne({ id });
    if (existeCurso) {
        throw new Error(`El curso con id ${id} no existe`);
    }
}

const validarNombreCurso = async (nombre = "") => {
    const existeCurso = await Curso.findOne({ nombre: nombre });
    if (existeCurso) {
        throw new Error(`El curso ${nombre} ya existe`);
    }
}

const cantidadDeCursos = async (cursos = [""]) => {
    if (cursos && cursos.length > 3) {
        throw new Error(`Solo debe ingresar 3 cursos`);
    }
}

const verificarIdCursos = async (cursos = [""]) => {
    for (let buscarIdCurso of cursos) {
        const existeCurso = await Curso.findById({ _id: buscarIdCurso });
        if (!existeCurso) {
            throw new Error(`No existe el curso con ID: ${buscarIdCurso}`);
        }
    }
}

const verificarCursosRepetidos=async(cursos=[""])=>{
    let existe=0;
    for(let idCurso of cursos){
        existe = cursos.filter(curso => curso==idCurso).length;
        if(existe>1){
            throw new Error(`El curso ${idCurso} se repite ${existe} veces.`);
        }
    };   
}

const existeEstudianteById = async (id = "") => {
    const existeEstudiante = await Estudiante.findById({_id:id});
    if (!existeEstudiante) {
        throw new Error(`El estudiante con id ${id} no existe`);
    }
}

module.exports = {
    existenteEmailMaestro,
    existeEmailEstudiante,
    existeCursoById,
    cantidadDeCursos,
    verificarIdCursos,
    validarNombreCurso,
    verificarCursosRepetidos,
    existeEstudianteById
}
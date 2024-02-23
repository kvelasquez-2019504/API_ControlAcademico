const Curso = require('../models/curso');
const Estudiante = require('../models/estudiante');
const Maestro = require("../models/maestros");

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

const cantidadDeCursos = async (cursos = [""]) => {
    if (cursos && cursos.length > 3) {
        throw new Error(`Solo debe ingresar 3 cursos`);
    }
}

const verificarIdCursos = async (cursos = [""]) => {
    var vuelta=0;
    for (let buscarIdCurso of cursos) {
        vuelta++;
        const existeCurso = await Curso.findById({_id:buscarIdCurso});
        if(!existeCurso){
            throw new Error(`No existe el curso con ID: ${buscarIdCurso}`);
        }
    }
}

const existeEstudianteById = async (id = "") => {
    const existeEstudiante = await Estudiante.findOne({ id });
    if (existeEstudiante) {
        throw new Error(`El estudiante con id ${id} no existe`);
    }
}

module.exports = {
    existenteEmailMaestro,
    existeEmailEstudiante,
    existeCursoById,
    cantidadDeCursos,
    verificarIdCursos,
    existeEstudianteById
}
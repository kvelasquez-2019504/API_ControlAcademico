const Estudiante = require('../models/estudiante');
var estudianteId = "";
const existeEmailEstudiante = async (correo = "") => {
    const existeEmail = await Estudiante.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El email ${correo} ya está registrado`);
    }
}

const existeEstudianteById = async (id = "") => {
    const existeEstudiante = await Estudiante.findOne({ _id: id });
    estudianteId = id;
    if (!existeEstudiante) {
        throw new Error(`El usuario con el ${id} no existe`);
    }
}

const existeCurso1 = async (curso1 = "") => {
    const estudiante = await Estudiante.findOne({ _id: estudianteId });
    if (!curso1 == "") {
        if (curso1 == estudiante.curso2 || curso1 == estudiante.curso3) {
            throw new Error(`El curso ${curso1} ya fue asignado`);
        }
    }
}

const existeCurso2 = async (curso2 = "") => {
    const estudiante = await Estudiante.findOne({ _id: estudianteId });
    if (!curso2 == "") {
        if (curso2 == estudiante.curso1 || curso2 == estudiante.curso3) {
            throw new Error(`El curso ${curso2} ya fue asignado`);
        }
    }
}

const existeCurso3 = async (curso3 = "") => {
    const estudiante = await Estudiante.findOne({ _id: estudianteId });
    if (!curso3 == "") {
        if (curso3 == estudiante.curso1 || curso3 == estudiante.curso2) {
            throw new Error(`El curso ${curso3} ya fue asignado`);
        }
    }
}

module.exports = {
    existeCurso1,
    existeCurso2,
    existeCurso3,
    existeEstudianteById,
    existeEmailEstudiante
}
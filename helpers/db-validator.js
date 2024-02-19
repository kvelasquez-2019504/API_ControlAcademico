const Estudiante = require('../models/estudiante');
const Maestro = require("../models/maestros");
const Usuario = require("../models/usuario");
const Curso = require('../models/curso');
var estudianteId = "";

const existeEmailEstudiante = async (correo = "") => {
    const existeEmail = await Estudiante.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El email ${correo} ya está registrado`);
    }
}

const existenteEmailMaestro = async (correo = "") => {
    const existeEmail = await Maestro.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El email ${correo} ya está registrado`);
    }
}

const existenciaMaestroById = async (id = "") => {
    const existeMaestro = await Maestro.findOne({ _id: id });
    if (!existeMaestro) {
        throw new Error(`El maestro con el ${id} no existe`);
    }
}

const existeEstudianteById = async (id = "") => {
    const existeEstudiante = await Estudiante.findOne({ _id: id });
    estudianteId = id;
    if (!existeEstudiante) {
        throw new Error(`El estudiante con el ${id} no existe`);
    }
}

const existeUsuarioById = async (id = "") => {
    const existeUsuario = await Usuario.findOne({ _id: id });
    if (!existeUsuario) {
        throw new Error(`El usuario con id ${id} no existe`);
    }
}

const existeCursoById= async(id="")=>{
    const existeCurso = await Curso.findOne({_id:id});
    if(!existeCurso){
        throw new Error(`El curso con id ${id} no existe`);
    }
}

const existeCorreoUsuario = async (correoUsuario = "") => {
    const existeEmailUsuario = await Usuario.findOne({ correoUsuario: correoUsuario });
    if (existeEmailUsuario) {
        throw new Error(`El usuario con el correo ${correoUsuario} ya existe`);
    }
}

const validarCorreoUsuario = async (correoUsuario = "") => {
    const emailEstudiante = await Estudiante.findOne({ correo: correoUsuario });
    const emailMaestro = await Maestro.findOne({ correo: correoUsuario });

    if (!emailEstudiante) {
        if (!emailMaestro) {
            throw new Error(`El correo ingresado no corresponde a Estudiante ni profesor`);
        }
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

module.exports = {existeCursoById,
    validarCorreoUsuario,
    existeCorreoUsuario,
    existeUsuarioById,
    existenteEmailMaestro,
    existenciaMaestroById,
    existeCurso1,
    existeCurso2,
    existeCurso3,
    existeEstudianteById,
    existeEmailEstudiante
}
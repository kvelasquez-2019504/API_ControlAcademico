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
module.exports = {
    estudiantesPost,
    estudiantesGet
}
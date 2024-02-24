const {response,json}= require('express');
const bcrypt = require("bcryptjs");
const Maestro =require('../models/maestros');

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

module.exports={
    maestrosPost
}
const { response } = require("express");
const bcryptjs = require('bcryptjs')
const Estudiante = require("../models/estudiante");
const Maestro = require("../models/maestros");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
    const { correo, password } = req.body;
    let token;
    let object;
    try {
        //verificar correo
        const maestro = await Maestro.findOne({ correo });
        const estudiante = await Estudiante.findOne({ correo });
        if (!maestro && !estudiante) {
            return res.status(400).json({
                msg: "El correo no ha sido registrado"
            });
        }

        if(maestro){
            if(!maestro.estado){
                return res.status(400).json({
                    msg: "El usuario no existe en la Base de Datos"
                });
            }
            const validPasswordTeacher = bcryptjs.compareSync(password, maestro.password);
            if (!validPasswordTeacher) {
                return res.status(200).json({
                    msg: "La contraseña ingresada es incorrecta"
                });
            }
            token = await generarJWT(maestro.id);
            object=maestro;
        }
        
        if(estudiante){   
            if( !estudiante.estado){
                return res.status(400).json({
                    msg: "El usuario no existe en la Base de Datos"
                });
            }
            const validPasswordEstudiante = bcryptjs.compareSync(password, estudiante.password);
            if (!validPasswordEstudiante) {
                return res.status(200).json({
                    msg: "La contraseña ingresada es incorrecta"
                });
            }
            token = await generarJWT(estudiante.id);
            object=estudiante;
        }

        res.status(200).json({
            msg: "LOGIN SUCCESS",
            object,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Comuniquese con el administrador"
        });
    }
}

module.exports = {
    login
}
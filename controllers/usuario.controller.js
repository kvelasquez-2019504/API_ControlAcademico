const { response, json } = require('express');
const Usuario = require("../models/usuario");

const usuariosGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.status(200).json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, estado, rol, ...resto } = req.body;
    await Usuario.findByIdAndUpdate(id, resto);
    const usuarioNew = await Usuario.findOne({ _id: id });
    res.status(200).json({
        msg: "Se ha actualizado el usuario",
        usuarioNew
    });
}

const usuarioDelete = async (req, res = response) => {
    const { id } = req.params;
    await Usuario.findByIdAndUpdate(id,{ estado: false });
    const usuarioNew = await Usuario.findOne({_id:id});
    res.status(200).json({
        msg: "Se ha eliminado el usuario",
        usuarioNew
    });
}

const usuariosPost = async (req, res = response) => {
    const { nombreUsuario, correoUsuario, claveUsuario, rol, estado } = req.body;
    const usuario = new Usuario({ nombreUsuario, correoUsuario, claveUsuario, rol, estado });
    await usuario.save();
    res.status(200).json({
        usuario
    });
}

module.exports = {usuarioDelete,
    usuariosPut,
    usuariosPost,
    usuariosGet
}
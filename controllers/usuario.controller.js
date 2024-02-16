const {response, json}=require('express');
const Usuario = require("../models/usuario");

const usuariosGet= async(req,res=response)=>{
    const {limite,desde}=req.query;
    const query= {estado:true};
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

const usuariosPut=async(req,res=response)=>{
    
}

const usuariosPost=async(req,res= response)=>{
    const {nombreUsuario,correoUsuario,claveUsuario,rol,estado}=req.body;
    const usuario = new Usuario({nombreUsuario,correoUsuario,claveUsuario, rol,estado});
    await usuario.save();
    res.status(200).json({
        usuario
    });
}

module.exports= {usuariosPost,
    usuariosGet
}
const {response, json} = require("express");
const Curso = require("../models/curso")

const cursosGet=async(req,res=response)=>{
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

module.exports={
    cursosGet
}
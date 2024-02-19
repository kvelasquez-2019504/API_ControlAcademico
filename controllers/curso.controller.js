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

const cursosGetById=async(req,res=response)=>{
    const {id} = req.params;
    const curso = await Curso.findOne({_id:id}); 
    res.status(200).json({
       curso
    });
}

const cursosPost=async(req,res=response)=>{
    const {nombre} =req.body;
    const curso = new Curso({nombre});
    await curso.save();
    res.status(200).json({
        msg:"El curso se ha guardado",
        curso
    });
}

const cursosPut = async (req, res=response)=>{
    const {id}= req.params;
    const {nombre} = req.body;
    await Curso.findByIdAndUpdate(id,{nombre});
    const cursoNew = await Curso.findOne({_id:id});
    res.status(200).json({
        msg:"Se ha actualizado el curso",
        cursoNew
    });
}

const cursosDelete = async (req, res=response)=>{
    const {id}= req.params;
    await Curso.findByIdAndUpdate(id,{estado:false});
    const curso = await Curso.findOne({_id:id});
    res.status(200).json({
        msg:"Se ha eliminado el curso",
        curso
    });
}

module.exports={cursosDelete,
    cursosPut,
    cursosPost,
    cursosGetById,
    cursosGet
}
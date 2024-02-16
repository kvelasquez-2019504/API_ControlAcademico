const {response,json}= require('express');
const Maestro =require('../models/maestros');

const maestrosGet= async (req,res = response)=>{
    const {limite, desde} = req.query;
    const query = {estado:true};
    const [total, maestros] = await Promise.all([
        Maestro.countDocuments(query),
        Maestro.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.status(200).json({
        total, 
        maestros
    });
}

module.exports={
    maestrosGet
}
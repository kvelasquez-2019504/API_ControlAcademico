const {Schema, model}= require('mongoose');

const CursoSchema = Schema({
    nombre:{
        type:String,
        required:[true,"Es obligatorio el nombre del curso"]
    },
    estado:{
        type:Boolean,
        default:true
    }
});

module.exports = model("Curso", CursoSchema);
const {Schema,model}= require('mongoose');

const MaestroSchema = Schema({
    nombres:{
        type:String,
        required:[true, "Tus nombres son obligatorios"]
    },
    apellidos:{
        type:String,
        required:[true, "Los apellidos son obligarorios"]
    },
    correo:{
        type:String,
        required:[true, "El correo es obligatorio"]
    },
    grado:{
        type:String,
        required:[true,"El grado es requerido"]
    },
    edad:{
        type:Number,
        required:[true, "La edad es obligatoria"]
    },
    cursos:{
        type:Array,
        required:[true,"Las clases son obligatorias"]
    },
    estado:{
        type:Boolean,
        default:true
    }
});

module.exports = model('Maestro', MaestroSchema);
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
    password:{
        type:String,
        required:[true, "El password es obligatorio"]
    },
    cursos:{
        type:Array,
        required:[true,"Las clases son obligatorias"]
    },
    rol:{
        type:String,
        default:"TEACHER_ROLE"
    },
    estado:{
        type:Boolean,
        default:true
    }
});

MaestroSchema.methods.toJSON=function(){
    const {__v, password,_id,...maestro}=this.toObject();
    maestro.uid=_id;
    return maestro;
}

module.exports = model('Maestro', MaestroSchema);
const mongoose = require('mongoose');
const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{});
        console.log('La conexión a la base de datos ha sido exitosa.');
    } catch (error) {
        throw new Error ('Error al conectar a la base de datos',error);
    }
}

module.exports={
    dbConnection
}
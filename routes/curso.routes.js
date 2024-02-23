const {Router} = require('express');
const {cursosDelete,
    cursosPut,
    cursosPost,
    cursosGetById,
    cursosGet} = require('../controllers/curso.controller');
const {validarCampos}=require('../middlewares/validar-campos');
const {existeCursoById,validarNombreCurso} = require('../helpers/db-validator');
const {check} =require('express-validator');
const router = Router();

router.get("/",cursosGet);

router.get("/:id",[
    check("id","El id no corresponde a un ID de Mongo").isMongoId(),
    check("id").custom(existeCursoById),
    validarCampos
],cursosGetById);

router.post('/', [
    check("nombre","El nombre de la materia es obligatorio").not().isEmpty(),
    check("nombre").custom(validarNombreCurso),
    validarCampos
],cursosPost);

router.put("/:id",[
    check("id","El id no corresponde a un ID de Mongo").isMongoId(),
    check("id").custom(existeCursoById),
    validarCampos
],cursosPut);

router.delete("/:id",[
    check("id","El id no corresponde a un ID de Mongo").isMongoId(),
    check("id").custom(existeCursoById),
    validarCampos
],cursosDelete);

module.exports =router;
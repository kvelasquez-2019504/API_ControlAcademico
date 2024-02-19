const {Router} = require('express');
const {cursosPut,
    cursosPost,
    cursosGet} = require('../controllers/curso.controller');
const {validarCampos}=require('../middlewares/validar-campos');
const {existeCursoById} = require('../helpers/db-validator')
const {check} =require('express-validator');
const router = Router();

router.get("/",cursosGet);

router.post('/', [
    check("nombre","El nombre de la materia es obligatorio").not().isEmpty(),
    validarCampos
],cursosPost);

router.put("/:id",[
    check("id","El id no corresponde a un ID de Mongo").isMongoId(),
    check("id").custom(existeCursoById),
    validarCampos
],cursosPut);

module.exports =router;
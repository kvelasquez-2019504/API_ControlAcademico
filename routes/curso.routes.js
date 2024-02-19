const {Router} = require('express');
const {cursosPost,cursosGet} = require('../controllers/curso.controller');
const {validarCampos}=require('../middlewares/validar-campos');
const {check} =require('express-validator');
const router = Router();

router.get("/",cursosGet);

router.post('/', [
    check("nombre","El nombre de la materia es obligatorio").not().isEmpty(),
    validarCampos
],cursosPost);

module.exports =router;
const {Router} = require('express');
const {cursosGet} = require('../controllers/curso.controller');
const {validarCampos}=require('../middlewares/validar-campos');
const {check} =require('express-validator');
const router = Router();

router.get("/",cursosGet)

module.exports =router;
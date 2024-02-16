const {Router} = require('express');
const {maestrosGet} = require('../controllers/maestro.controller');
const {validarCampos}=require('../middlewares/validar-campos');
const {check} = require('express-validator');
const router = Router();

router.get('/',maestrosGet);
module.exports= router;

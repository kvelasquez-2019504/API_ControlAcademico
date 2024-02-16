const {Router}=require('express');
const {check} = require('express-validator');
const {validarCampos}=require('../middlewares/validar-campos');
const {usuariosPost,usuariosGet} = require("../controllers/usuario.controller");
const router = Router();

router.get("/", usuariosGet);
router.post("/",[
    check("nombreUsuario","El nombre es obligatorio").not().isEmpty(),
    check("correoUsuario","El correo es obligatorio").not().isEmpty(),
    check("correoUsuario").isEmail(),
    check("claveUsuario","La contraseña es obligatoria").isLength({min:6}),
    check("rol","El rol es obligatorio"),
    validarCampos
],usuariosPost);
module.exports= router;
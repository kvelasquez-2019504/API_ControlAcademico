const {Router}=require('express');
const {check} = require('express-validator');
const {validarCampos}=require('../middlewares/validar-campos');
const {usuarioDelete,
    usuariosPut,
    usuariosPost,
    usuariosGetById,
    usuariosGet} = require("../controllers/usuario.controller");
const {validarCorreoUsuario,
    existeUsuarioById,
    existeCorreoUsuario} = require("../helpers/db-validator");
const router = Router();

router.get("/", usuariosGet);

router.get("/:id",[
    check("id","El id ingresado no es valido para MONGO").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos
],usuariosGetById);

router.put("/:id",[
    check("id","El id ingresado no es valido para MONGO").isMongoId(),
    check("id").custom(existeUsuarioById),
    check("correoUsuario","El correo es obligatorio").isEmail(),
    check("correoUsuario").custom(validarCorreoUsuario),
    check("claveUsuario","La contraseña es obligatoria y mayor a 6 caracteres").isLength({min:6}),
    validarCampos
],usuariosPut);

router.delete("/:id",[
    check("id","El id ingresado no es valido para MONGO").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos
],usuarioDelete);

router.post("/",[
    check("nombreUsuario","El nombre es obligatorio").not().isEmpty(),
    check("correoUsuario","El correo es obligatorio").isEmail(),
    check("correoUsuario").custom(existeCorreoUsuario),
    check("correoUsuario").custom(validarCorreoUsuario),
    check("claveUsuario","La contraseña es obligatoria y mayor a 6 caracteres").isLength({min:6}),
    check("rol","El rol es obligatorio"),
    validarCampos
],usuariosPost);
module.exports= router;
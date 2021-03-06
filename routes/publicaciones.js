const { Router } = require("express");
const { check } = require("express-validator");

const {
  publicacionGet,
  publicacionPost,
  publicacionPut,
  publicacionDelete,
  
} = require("../controllers/publicacion.controller");

const { publicacionExiste } = require("../helpers/db-validators-publicacion");
const { validarCampos } = require("../middlewares/validar-campos");
const { ubicarId } = require("../middlewares/validar-id");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", [
   
], publicacionGet);

router.get("/:id", [
  check("id", 'El id no es valido').isMongoId(),
  ubicarId,
], publicacionGet);

router.post("/", [
  validarJWT,  
  validarCampos
], publicacionPost);

router.put("/:id", [
  validarJWT,
  check('texto', "El texto es obligatorio").not().isEmpty(),
  check('id').custom(publicacionExiste),
  validarCampos
], publicacionPut);

router.delete("/:id", [
  check('id', 'El id no es valido').isMongoId(),
  check('id').custom(publicacionExiste),
  validarCampos
], publicacionDelete);

module.exports = router;

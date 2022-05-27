const { Router } = require("express");
const { check } = require("express-validator");

const {
  publicacionGet,
  publicacionPost,
  publicacionPut,
  publicacionDelete,
  publicacionGetId,
  publicacionGetUid,
} = require("../controllers/publicacion.controller");

const { publicacionExiste } = require("../helpers/db-validators-publicacion");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", publicacionGet);
router.get("/:id", [
  check('id', 'El id no es valido').isMongoId(),
  check('id').custom(publicacionExiste),
  validarCampos
], publicacionGetId);

router.get("/:uid", [], publicacionGetUid);

router.post("/", [
  check("texto", "El texto es obligatorio").not().isEmpty(),
  validarCampos
], publicacionPost);

router.put("/:id", [
  check('id', 'El id no es valido').isMongoId(),
  check('id').custom(publicacionExiste),
  check("texto", "El texto es obligatorio").not().isEmpty(),
  validarCampos
], publicacionPut);

router.delete("/:id", [
  check('id', 'El id no es valido').isMongoId(),
  check('id').custom(publicacionExiste),
  validarCampos
], publicacionDelete);

module.exports = router;

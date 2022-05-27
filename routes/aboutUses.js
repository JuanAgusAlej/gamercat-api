const { Router } = require("express");
const {check} = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { emailExiste, aboutUseExiste } = require("../helpers/db-validators-aboutuse");
const {
  aboutUseDelete,
  aboutUseGet,
  aboutUsePost,
  aboutUsePut,
} = require("../controllers/aboutUse.controllers");

const router = Router();
router.get("/",aboutUseGet);
router.post("/", [
  check("name", "El nombre es obligatorio").not().isEmpty(),
  check('email', 'El email es obligatorio').not().isEmpty(),
  check('email', 'No es un correo valido').isEmail(),
  check('email').custom(emailExiste),
  check('imagen', 'La imagen es obligatoria').not().isEmpty(),
  check('skill', 'Los skill son obligatorio').not().isEmpty(),
  validarCampos
], aboutUsePost);
router.put("/:id", [
  check('id', 'El id no es valido').isMongoId(),
  check('id').custom(aboutUseExiste),
  validarCampos
], aboutUsePut);
router.delete("/:id", [
  check('id', 'El id no es valido').isMongoId(),
  check('id').custom(aboutUseExiste),
  validarCampos
], aboutUseDelete);

module.exports = router;

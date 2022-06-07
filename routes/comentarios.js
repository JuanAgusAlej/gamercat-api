const { Router } = require("express");
const { check } = require("express-validator");
const {
  comentarioGet,
  comentarioPost,
  comentarioPut,
  comentarioDelete,
} = require("../controllers/comentario.controllers");
const { comentarioExiste } = require("../helpers/db-validators-comentarios");
const { publicacionExiste } = require("../helpers/db-validators-publicacion");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", comentarioGet);
router.post("/:idPost", [
  validarJWT,
  check('idPost', 'El id no es valido').isMongoId(),
  check('idPost').custom(publicacionExiste),
  check("descripcion", "El descripcion es obligatorio").not().isEmpty(),
  validarCampos
], comentarioPost);
router.put("/:id", [
  validarJWT,
  check('id', 'El id no es valido').isMongoId(),
  check('id').custom(comentarioExiste),
  validarCampos
], comentarioPut);

 
router.delete("/", [
  validarJWT,
  check('id', 'El id no es valido').isMongoId(),
  check('id').custom(comentarioExiste),
  validarCampos
], comentarioDelete);

module.exports = router;

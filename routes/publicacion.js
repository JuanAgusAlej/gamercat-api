const { Router } = require("express");

const {
  publicacionGet,
  publicacionPost,
  publicacionPut,
  publicacionDelete,
} = require("../controllers/publicacion.controller");

const router = Router();

router.get("/", publicacionGet);
router.post("/", publicacionPost);
router.put("/", publicacionPut);
router.delete("/", publicacionDelete);

module.exports = router;

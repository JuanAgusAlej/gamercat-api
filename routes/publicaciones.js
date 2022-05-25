const { Router } = require("express");

const {
  publicacionGet,
  publicacionPost,
  publicacionPut,
  publicacionDelete,
  publicacionGetId,
  publicacionGetUid,
} = require("../controllers/publicacion.controller");

const router = Router();

router.get("/", publicacionGet);
router.get("/:id", publicacionGetId);
router.get("/:uid", publicacionGetUid);
router.post("/", publicacionPost);
router.put("/", publicacionPut);
router.delete("/", publicacionDelete);

module.exports = router;

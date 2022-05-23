const { Router } = require("express");
const {
  comentarioGet,
  comentarioPost,
  comentarioPut,
  comentarioDelete,
} = require("../controllers/comentario.controllers");

const router = Router();

router.get("/", comentarioGet);
router.post("/", comentarioPost);
router.put("/", comentarioPut);
router.delete("/", comentarioDelete);

module.exports = router;

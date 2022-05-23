const { Router } = require("express");
const {
  aboutUseDelete,
  aboutUseGet,
  aboutUsePost,
  aboutUsePut,
} = require("../controllers/aboutUse.controllers");

const router = Router();
router.get("/", aboutUseGet);
router.post("/", aboutUsePost);
router.put("/", aboutUsePut);
router.delete("/", aboutUseDelete);

module.exports = router;

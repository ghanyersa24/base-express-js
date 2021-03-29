const router = require("express").Router();
const { create, get } = require("./index");
const { checkToken } = require("../../middleware/jwt");

// router.post("/", checkToken, create);
// router.get("/users", checkToken, get);

router.post("/", create);
router.get("/users", get);

module.exports = router;

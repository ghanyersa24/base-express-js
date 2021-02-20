const router = require("express").Router();
const { create, get } = require("./index");
const { checkToken } = require("../../middleware/jwt");

router.post("/", checkToken, create);
router.get("/users", checkToken, get);

module.exports = router;

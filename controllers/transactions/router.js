const router = require("express").Router();
const { create, get } = require("./index");

router.post("/", create);
router.get("/users", get);

module.exports = router;

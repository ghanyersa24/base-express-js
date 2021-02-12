const router = require("express").Router();
const { get, create, update, del } = require("./index");
const { runValidator, postValidator, putValidator } = require("./validation");

router.get("/", get);
router.post("/", postValidator, runValidator, create);
router.put("/", putValidator, runValidator, update);
router.delete("/", del);

module.exports = router;

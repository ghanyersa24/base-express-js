const { get, create, update, del } = require("./index");
const { postValidator, putValidator, runValidator } = require("./validation");
const router = require("express").Router();

router.get("/", get);
router.post("/", postValidator, runValidator, create);
router.put("/", putValidator, runValidator, update);
router.delete("/", del);

module.exports = router;

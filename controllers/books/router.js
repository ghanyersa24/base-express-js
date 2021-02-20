const { get, create, update, del } = require("./index");
const { postValidator, putValidator, runValidator } = require("./validation");
const router = require("express").Router();
const { checkToken } = require("../../middleware/jwt");

router.get("/", checkToken, get);
router.post("/", checkToken, postValidator, runValidator, create);
router.put("/", checkToken, putValidator, runValidator, update);
router.delete("/", checkToken, del);

module.exports = router;

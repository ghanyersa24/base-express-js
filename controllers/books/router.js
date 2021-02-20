const { get, create, update, del } = require("./index");
const { get: getType, create: createType } = require("./type");
const {
  postValidator,
  putValidator,
  runValidator,
  bookType,
} = require("./validation");
const router = require("express").Router();
const { checkToken } = require("../../middleware/jwt");

router.get("/", checkToken, get);
router.post("/", checkToken, postValidator, runValidator, create);
router.put("/", checkToken, putValidator, runValidator, update);
router.delete("/", checkToken, del);

router.get("/type", checkToken, getType);
router.post("/type", checkToken, bookType, runValidator, createType);

module.exports = router;

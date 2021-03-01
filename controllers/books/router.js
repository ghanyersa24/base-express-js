const { get, create, update, del } = require("./index");
const {
  get: getType,
  create: createType,
  update: updateType,
  del: deleteType,
} = require("./type");
const {
  postValidator,
  putValidator,
  runValidator,
  bookType,
  putBookType,
} = require("./validation");
const router = require("express").Router();
const { checkToken } = require("../../middleware/jwt");

router.get("/", get);
router.post("/", postValidator, runValidator, create);
router.put("/", putValidator, runValidator, update);
router.delete("/", del);

router.get("/type", getType);
router.post("/type", bookType, runValidator, createType);
router.put("/type", putBookType, runValidator, updateType);
router.delete("/type", deleteType);

module.exports = router;

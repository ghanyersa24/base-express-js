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

router.get("/", checkToken, get);
router.post("/", checkToken, postValidator, runValidator, create);
router.put("/", checkToken, putValidator, runValidator, update);
router.delete("/", checkToken, del);

router.get("/type", checkToken, getType);
router.post("/type", checkToken, bookType, runValidator, createType);
router.put("/type", checkToken, putBookType, runValidator, updateType);
router.delete("/type", checkToken, deleteType);

module.exports = router;

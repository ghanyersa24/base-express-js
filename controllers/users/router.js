const router = require("express").Router();
const { get, create, update, del } = require("./index");
const { login, loginValidation } = require("./login");
const { profile, updateProfile } = require("./profile");
const { runValidator, postValidator, putValidator } = require("./validation");
const { checkToken } = require("../../middleware/jwt");

// router.get("/", checkToken, get);
// router.post("/", checkToken, postValidator, runValidator, create);
// router.put("/", checkToken, putValidator, runValidator, update);
// router.delete("/", checkToken, del);
router.get("/", get);
router.post("/", postValidator, runValidator, create);
router.put("/", putValidator, runValidator, update);
router.delete("/", del);

router.get("/api", get);
router.post("/api", postValidator, runValidator, create);
router.put("/api", putValidator, runValidator, update);
router.delete("/api", del);

router.post("/login", loginValidation, runValidator, login);
router.get("/profile", checkToken, profile);
router.put("/profile", checkToken, updateProfile);
module.exports = router;

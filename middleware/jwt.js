const jwt = require("jsonwebtoken");
const { failed } = require("../config/response");

exports.checkToken = (req, res, next) => {
  let token = req.get("x-auth-token");
  if (!token) {
    return res.json(failed({ message: "Unauthorized." }));
  } else {
    // token = token.slice(7);
    jwt.verify(token, "shiftacademy", (err, decoded) => {
      if (err) {
        return res.json(failed({ message: "Invalid token ..." }));
      } else {
        req.auth = decoded;
        next();
      }
    });
  }
};

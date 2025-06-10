const jwt = require("jsonwebtoken");
const checkToken = (req, res, next) => {
  //console.log(req.headers.authorization);
  //console.log(req.headers['authorization']);
  try {
    if (!req.headers.authorization) {
      res.json({ success: false, message: "El token es obligatorio" });
    }
    // token --> Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp
    const token = req.headers.authorization.split(" ")[1];

    try {
      data = jwt.verify(token, process.env.PASS_TOKEN);
      console.log(data);
    } catch (error) {
      res.json({ message: "Token incorrecto" });
    }
    req.userLogin = data;
    next();
  } catch (error) {}
  //validar el token
};
module.exports = checkToken;

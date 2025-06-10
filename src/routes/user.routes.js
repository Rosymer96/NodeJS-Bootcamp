//Los Endpoints de la CRUD;

const router = require("express").Router();
const {
  createUser,
  listUsers,
  listByName,
  updateUser,
  deleteUser,
  registerUser,
  login,
  getProfile,
} = require("../controllers/user.controllers");

const checkToken = require("../middleware/auth");

//importar la funcion crearusuario

//anadir usuario
//post-> ejecuta controlador
router.post("/create", createUser);

// get-> Listas todos los usuarios

router.get("/list", listUsers);

// buscar los usuarios que contengan un string en el nombre
// list-by-name?name=ana --->query params;

router.get("/list-by-name", listByName);

//Modificar un registro de la BD

router.put("/update-user/:id", updateUser);

//eliminar un registro de BD
router.delete("/delete/:id", deleteUser);

//endpoints para registro de usuario y login:

//Registrar al usuario:

router.post("/register", registerUser);

// //login -->

router.post("/login", login);

// //ver perfil de usuario--> privada o protegida

router.get("/profile", checkToken, getProfile);

//middleware si funciones intermedias que permiten hacer validaciones y comunicar 2 aplicaciones.

module.exports = router;

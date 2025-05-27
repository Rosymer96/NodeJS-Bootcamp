//Los Endpoints de la CRUD;

const router = require("express").Router();
const {
  createUser,
  listUsers,
  listByName,
  updateUser,
  deleteUser,
} = require("../controllers/user.controllers");
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

module.exports = router;

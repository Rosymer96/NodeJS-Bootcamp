//Crear las funciones para acceder a los datos
const Usuarios = require("../models/user.model");
//funcion para a;adir usuario a la BD

const createUser = async (req, res) => {
  try {
    console.log("se hacreado el usario");
    //recogemos del dato del user
    const data = req.body;
    const newUser = new Usuarios(data);
    //lo guardamos en la base de datos
    const userCreated = await newUser.save();
    res.json({ succes: true, data: userCreated });
  } catch (error) {
    res.json(error);
  }
};

const listUsers = async (req, res) => {
  try {
    const list = await Usuarios.find();
    res.json({
      sucess: true,
      data: list,
    });
  } catch (error) {
    res.json(error);
  }
};

const listByName = async (req, res) => {
  //obtener los datos
  const { name } = req.query;

  //buscar los usuarios que tengan el string name;
  const list = await Usuarios.find({ name: new RegExp(name, "i") });
  res.json({
    sucess: true,
    data: list,
  });
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;

    const userUpdated = await Usuarios.findByIdAndUpdate(id, user, {
      new: true,
      overwrite: true,
      runValidators: true,
    });

    if (!userUpdated) {
      res.json({
        sucess: false,
        message: "Usuario no encontrado",
      });
    } else {
      res.json({
        sucess: true,
        message: "Usuario modificado con exito",
        data: userUpdated,
      });
    }
  } catch (error) {
    res.json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userDeleted = await Usuarios.findByIdAndDelete(id);
    if (!userDeleted) {
      res.json({
        sucess: false,
        message: "Usuario no encontrado",
      });
    } else {
      res.json({
        sucess: true,
        message: "Usuario eliminado con exito",
        data: userDeleted,
      });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = { createUser, listUsers, listByName, updateUser, deleteUser };

const mongoose = require("mongoose");

//mongodb+srv://rosymer96:a0WOuq6bi5tNq5dR@rosymer96.mb8wyhm.mongodb.net/academia?retryWrites=true&w=majority&appName=Rosymer96

const url =
  "mongodb+srv://rosymer96:a0WOuq6bi5tNq5dR@rosymer96.mb8wyhm.mongodb.net/academia?retryWrites=true&w=majority&appName=Rosymer96";
const connectDB = async () => {
  try {
    console.log(process.env.DB_URL);
    const db = await mongoose.connect(process.env.DB_URL);
    const { name, host } = db.connection;
    console.log(`Nombre db ${name}, servidor: ${host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;

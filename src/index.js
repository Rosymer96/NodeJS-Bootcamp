const express = require("express");

const connectDB = require("./config/conexion");
require("dotenv").config();

connectDB();

const routesProducts = require("./routes/products.routes");
const routesUsers = require("./routes/user.routes");
const routerCourses = require("./routes/courses.routes");
//crear un servidor

const server = express();
server.use(express.json());

//crear endpoints

server.get("/home", (req, res) => {
  res.json({ message: "Ha ido todo bien" });
});

server.use("/api", routesProducts);
// server.get("/products", (req, res) => {
//   res.json(products);
// });

server.use("/", routesUsers);

server.use("/courses", routerCourses);

const PORT = 3500;

server.listen(PORT, () => {
  console.log(`Server running http:\\localhost:${PORT}`);
});

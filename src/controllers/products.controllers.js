const products = [
  { id: 1, nombre: "Silla de comedor", precio: 45.99 },
  { id: 2, nombre: "Mesa de centro", precio: 89.5 },
];

const getAllProducts = (req, res) => {
  res.json(products);
};

const getProductId = (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;
  const product = products.find((item) => item.id === parseInt(id));
  res.json({
    message: "Exito",
    data: product,
  });
};

const getProductName = (req, res) => {
  const { name } = req.query;
  const productsName = products.filter((item) => item.nombre.includes(name));
  res.json({
    message: "Exito",
    data: productsName,
  });
  console.log(req.query);
};

module.exports = { getAllProducts, getProductId, getProductName };

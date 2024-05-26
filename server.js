const express = require("express");
const path = require("path");
const { randomUUID } = require("crypto");
const methodOverride = require("method-override");
const products = require("./data");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("pages/home", { title: "Home" });
});

app.get("/products", (req, res) => {
  res.render("products/index", { products });
});
// render a form to create new product
app.get("/products/new", (req, res) => {
  res.render("products/new");
});
// Create new product
app.post("/products", (req, res) => {
  const { name, price, image } = req.body;
  products.push({ id: randomUUID(), name, price, image });
  res.redirect("/products");
});
// Get single product
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id == id);
  res.render("products/show", { product });
});
// render a form to edit product
app.get("/products/:id/edit", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id == id);
  res.render("products/edit", { product });
});
// Update product
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  const product = products.find((p) => p.id == id);
  product.name = name;
  product.price = price;
  product.image = image;
  res.redirect("/products");
});
// Delete product
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id == id);
  const index = products.indexOf(product);
  products.splice(index, 1);
  res.redirect("/products");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.send("<h1>Ini adalah halaman Homepage</h1>");
  res.status(200);
  // res.sendFile("./index.html", { root: __dirname });
  const Mahasiswa = [
    {
      nama: "asep",
      email: "asep@admin.com",
    },
    {
      nama: "usro",
      email: "usro@admin.com",
    },
  ];
  res.render("index", {
    nama: "Faikar Moch Tajudin",
    title: "Halaman Index",
    Mahasiswa: Mahasiswa,
  });
});

app.get("/about", (req, res) => {
  res.status(200);
  res.render("about");
  // res.send("<h1>Ini adalah halaman About</h1>");
  // res.json({
  //   nama: "Faikar Moch Tajudin",
  //   email: "faikar@admin.com",
  //   telp: "081234567890",
  // });
  // res.sendFile("./about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  // res.send("<h1>Ini adalah halaman Contact</h1>");
  res.status(200);
  // res.sendFile("./contact.html", { root: __dirname });
  res.render("contact");
});

app.get("/product", (req, res) => {
  res.send(`Label Product: ${req.query.label}`);
});

app.get("/product/:id", (req, res) => {
  res.send("Product ID: " + req.params.id);
});

app.get("/product/:id/category/:idCat", (req, res) => {
  res.send(`Product ID: ${req.params.id} and Category ID: ${req.params.idCat}`);
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>Halaman tidak ditemukan</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContact,
} = require("./utils/contact");
const { body, validationResult, check } = require("express-validator");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

app.get("/", (req, res, next) => {
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
    layout: "layouts/main-layout",
    Mahasiswa: Mahasiswa,
  });
});

app.get("/about", (req, res, next) => {
  res.status(200);
  res.render("about", {
    layout: "layouts/main-layout",
    title: "Halaman About",
  });
  next();
  // res.send("<h1>Ini adalah halaman About</h1>");
  // res.json({
  //   nama: "Faikar Moch Tajudin",
  //   email: "faikar@admin.com",
  //   telp: "081234567890",
  // });
  // res.sendFile("./about.html", { root: __dirname });
});

app.get("/contact", (req, res, next) => {
  // res.send("<h1>Ini adalah halaman Contact</h1>");
  res.status(200);
  const contacts = loadContact();
  console.log(contacts);
  // res.sendFile("./contact.html", { root: __dirname });
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Halaman Contact",
    contacts,
    msg: req.flash("msg"),
  });
});

app.get("/contact/add", (req, res) => {
  res.status(200);
  res.render("add-contact", {
    layout: "layouts/main-layout",
    title: "Form Tambah Data Contact",
  });
});

app.post(
  "/contact",
  [
    check("email", "Email tidak valid").isEmail(),
    check("nohp", "Nomor HP tidak valid").isMobilePhone("id-ID"),
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Contact sudah terdaftar!");
      }
      return true;
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("add-contact", {
        layout: "layouts/main-layout",
        title: "Form Tambah Data Contact",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      req.flash("msg", "Data contact berhasil ditambahkan!");
      res.status(200);
      res.redirect("/contact");
    }
  }
);

app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  if (!contact) {
    res.status(404);
    res.send("404");
  } else {
    deleteContact(req.params.nama);
    req.flash("msg", "Data contact berhasil dihapus!");
    res.status(200);
    res.redirect("/contact");
  }
});

app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.status(200);
  res.render("edit-contact", {
    layout: "layouts/main-layout",
    title: "Form Ubah Data Contact",
    contact,
  });
});

app.post(
  "/contact/update",
  [
    check("email", "Email tidak valid").isEmail(),
    check("nohp", "Nomor HP tidak valid").isMobilePhone("id-ID"),
    body("nama").custom((value, { req }) => {
      const duplikat = cekDuplikat(value);
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Contact sudah terdaftar!");
      }
      return true;
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("edit-contact", {
        layout: "layouts/main-layout",
        title: "Form Ubah Data Contact",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      updateContact(req.body);
      req.flash("msg", "Data contact berhasil diubah!");
      res.status(200);
      res.redirect("/contact");
    }
  }
);

app.get("/contact/:nama", (req, res, next) => {
  // res.send("<h1>Ini adalah halaman Contact</h1>");
  res.status(200);
  const contact = findContact(req.params.nama);
  console.log(contact);
  // res.sendFile("./contact.html", { root: __dirname });
  res.render("detail", {
    layout: "layouts/main-layout",
    title: "Halaman Detail Contact",
    contact,
  });
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
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

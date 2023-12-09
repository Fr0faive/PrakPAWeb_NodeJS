const http = require("http");

const requestListener = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.statusCode = 200;

  const { method, url } = req;

  if (url === "/") {
    if (method === "GET") {
      res.statusCode = 200;
      res.end("<h1>Halo HTTP Server</h1>");
    } else {
      res.statusCode = 400;
      res.end(`<h1>Halaman tidak dapat diakses dengan ${method} request </h1>`);
    }
  } else if (url === "/about") {
    if (method === "GET") {
      res.statusCode = 200;
      res.end("<h1>Ini halaman About</h1>");
    } else if (method === "POST") {
      let body = [];

      req.on("data", (chunk) => {
        body.push(chunk);
      });

      req.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        res.statusCode = 200;
        res.end(`<h1>Hai, ${name}! Ini adalah halaman about</h1>`);
      });
    } else {
      res.statusCode = 400;
      res.end(`<h1>Halaman tidak dapat diakses dengan ${method} request </h1>`);
    }
  } else {
    res.statusCode = 404;
    res.end("<h1>Halaman tidak ditemukan!</h1>");
  }
};

const server = http.createServer(requestListener);
const port = 5000;
const host = "localhost";
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

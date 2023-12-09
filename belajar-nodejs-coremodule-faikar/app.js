const fs = require("fs");
console.log(fs);

try {
  fs.writeFileSync("data/test.txt", "Hello, World secara synchronous!");
} catch (e) {
  console.log(e);
}

fs.writeFile("data/test.txt", "Hello, World secara asynchronous!", (e) => {
  console.log(e);
});

const data = fs.readFileSync("data/test.txt", "utf-8");
console.log(data);

fs.readFile("data/test.txt", "utf-8", (e, data) => {
  if (e) throw e;
  console.log(data);
});

const readLine = require("readline");
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Masukkan nama anda: ", (nama) => {
  rl.question("Masukkan no HP anda: ", (noHP) => {
    const contact = {
      nama,
      noHP,
    };
    const file = fs.readFileSync("data/contact.json", "utf-8");
    const contacts = JSON.parse(file);

    contacts.push(contact);
    fs.writeFileSync("data/contact.json", JSON.stringify(contacts));
    console.log("Terima kasih sudah memasukkan data anda");
    rl.close();
  });
});

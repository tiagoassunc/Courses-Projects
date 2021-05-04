// Core modules

const fs = require("fs");
const http = require("http");
const url = require("url");
// 3rd modules
const slugify = require("slugify");
// Our Own Modules
const replaceTemplate = require("./modules/replaceTemplate");

//////////////////////////////////////////////////////////////////////////////////////////////
/// SERVER

// synchronous way => executed once => save data => don't have to be read each request

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
); // Overview template
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
); // Product template
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
); // Card template

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8"); // Json data
const dataObj = JSON.parse(data); // Object Json data

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);
console.log(dataObj);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true); // Destructuring {query, pathname}

  // OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);

    // PRODUCT PAGE
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" }); // Status Return on console and Network => OK, type json
    res.end(data); // Just return the Json data saved

    // NOT FOUND
  } else {
    res.writeHead(404, {
      // Status Return on console and Network => Not found, type html
      // And header => SET allways before response
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});

//////////////////////////////////////////////////////////////////////////////////////////////
/// FILES

// Blocking, synchronous way
/* const textIn = fs.readFileSync("./txt/input.txt", "utf-8"); // Function to read files
console.log(textIn);
const textOut = `This is what we know about avocado ${textIn}. \n Creat on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut); // Creat a file with texOut data 
console.log("File written!"); */

// Non Blocking, asynchronous way - Run behind without blocking code
/* fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("ERROR! 💥");

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile(
        "./txt/final.txt",
        `${data2} \n ${data3}`,
        "utf-8",
        (err) => {
          // Path, data to be write, utf-8, just err
          console.log("Your file has been written :)");
        }
      );
    });
  });
});
console.log("Will read file!"); // Print before output */

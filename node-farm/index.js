const fs = require("fs");

// Blocking, synchronous way
/* const textIn = fs.readFileSync("./txt/input.txt", "utf-8"); // Function to read files
console.log(textIn);
const textOut = `This is what we know about avocado ${textIn}. \n Creat on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut); // Creat a file with texOut data
console.log("File written!"); */

// Non Blocking, asynchronous way - Run behind without blocking code
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
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
console.log("Will read file!"); // Print before output

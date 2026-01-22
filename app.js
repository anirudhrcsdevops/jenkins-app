const http = require("http");

http.createServer((req, res) => {
  res.end("Hello ECS from Jenkins");
}).listen(3000);

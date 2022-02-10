const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer(function (req, res) {
  const method = req.method; // 获取请求方法
  if (method === "GET") {
    // get 请求方法判断
    const fileName = path.resolve(__dirname, "data.json");
    fs.readFile(fileName, function (err, data) {
      res.writeHead(200, { "Content-Type": "application/json" }); //application/json：代表响应的是json
      res.end(data.toString());
    });
  }
});
server.listen(8000, () => {
  console.log(`server started at http://127.0.0.1:8000`);
});

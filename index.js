const http = require("http");
const computation = () => {
  let sum = 0;
  console.info("计算开始");
  console.time("计算耗时");
  for (let i = 0; i < 1e10; i++) {
    sum += i;
  }
  console.info("计算结束");
  console.timeEnd("计算耗时");
  return sum;
};
const server = http.createServer();
server.on("request", (req, res) => {
  if (req.url === "/compute") {
    console.log('3000端口')
    const sum = computation();
    return res.end("hello word" + sum);
  } else {
    res.end("Ok");
  }
});
server.listen(3000, () => {
  console.log(`server started at http://127.0.0.1:3000`);
});

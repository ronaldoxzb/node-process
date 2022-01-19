const http = require("http");
const numCPUs = require("os").cpus().length;
const cluster = require("cluster");

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
if (cluster.isMaster) {
  console.log("Master proces id is", process.pid);
  // fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", function (worker, code, signal) {
    console.log("worker process died,id", worker.process.pid);
  });
} else {
  // Worker可以共享同一个TCP连接
  // 这里是一个http服务器

  const server = http.createServer();
  server.on("request", (req, res) => {
    if (req.url === "/compute") {
      const sum = computation();
      return res.end("hello word" + sum);
    } else {
      res.end("Ok");
    }
  });
  server.listen(8000, () => {
    console.log(`server started at http://127.0.0.1:8000`);
  })
}

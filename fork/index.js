const http = require("http");
const fork = require("child_process").fork;
const server = http.createServer((req, res) => {
  if (req.url == "/compute") {
    console.log('5000端口')
    const compute = fork("./fork/fork.js");
    compute.send("开启一个新的子进程");
    // 当一个子进程使用 process.send() 发送消息时会触发 'message' 事件
    compute.on("message", (sum) => {
      res.end("hello word" + sum);
      compute.kill();
    });
    // 子进程监听到一些错误消息退出
    compute.on("close", (code, signal) => {
      console.log(
        `收到close事件，子进程收到信号 ${signal} 而终止，退出码 ${code}`
      );
      compute.kill();
    });
  } else {
    res.end(`ok`);
  }
});

server.listen(5000, () => {
  console.log(`server started at http://127.0.0.1:5000`);
});

const express = require("express");
const cluster = require("cluster");
const os = require("os");

const port = 3000;
const totalCpus = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Number of cpus is ${totalCpus}`);
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < totalCpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log(`Lets fork another worker`);
    cluster.fork();
  });
} else {
  const app = express();
  console.log(`worker ${process.pid} started`);

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.get("/api/:n", (req, res) => {
    let n = parseInt(req.params.n);

    let count = 0;

    if (n > 5000000000) n = 5000000000;

    for (let i = 0; i <= n; i++) {
      count += i;
    }

    res.send(`Final count is ${count} ${process.pid}`);
  });

  app.listen(port, () => {
    console.log(`App is listening on the port ${port}`);
  });
}

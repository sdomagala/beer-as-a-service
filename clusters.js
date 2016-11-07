const cluster = require('cluster');
const os = require('os');

const CPUS = os.cpus();

if (cluster.isMaster) {
  CPUS.forEach(() => cluster.fork());

  cluster.on('exit', (worker) => {

    // Ensuring a new cluster will start if an old one dies
    cluster.fork();
  });
}
else {
  require('./index.js');
}

import { Injectable } from '@nestjs/common';
// import * as cluster from 'cluster';
import * as os from 'os';
const cluster = require("cluster");

const numCPUs = os.cpus().length;
@Injectable()
export class AppService {
  // getHello(): string {
  //   return 'Hello World!';
  // }
  static clusterize(callback: Function): void {
  
    if(cluster.isMaster){
        console.log(`Master server started on ${process.pid}`);
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died. Restarting`);
            cluster.fork();
        })
    } else {
        console.log(`Cluster server started on ${process.pid}`)
        callback();
    }
}
}

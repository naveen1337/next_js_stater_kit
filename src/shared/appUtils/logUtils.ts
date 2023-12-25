import pino, { Logger } from "pino";

const transports = pino.transport({
  targets: [
      {
          target: 'pino-pretty',
          options: {
              destination: `./logs/applogs.log`, 
              translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
              ignore: "pid,hostname",
              colorize:false
          },
      },  
      {
          target: 'pino-pretty',
          options: {
              translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
              ignore: "pid,hostname"
          }
      }
  ]
});

const logger = pino({},transports)

export default logger
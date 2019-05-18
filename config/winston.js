var winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint,printf } = format;

// define the custom settings for each transport (file, console)
var options = {
  info: {
    level: 'info',
    filename: './logs/app.log',
    handleExceptions: true,
    json: true,
    maxsize: 10485760, // 10MB
    maxFiles: 5,
    colorize: false,
  },
  error: {
    level: 'error',
    filename: './logs/error.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const myFormat = printf(info => {
  if(info.stack){
    return `${info.timestamp} ${info.level}: ${info.message}\n${info.stack}`;
  }else{
    return `${info.timestamp} ${info.level}: ${info.message}`;
  }
});
// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.File(options.info),
    new transports.File(options.error)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

if (process.env.NODE_ENV != 'production') {
  logger.add(new transports.Console(options.console));
}

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;
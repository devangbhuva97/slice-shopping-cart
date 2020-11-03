const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const config = require('../config');

const { logToConsole } = config.logger;

const logDir = 'logs';
const logFileFormat = 'YYYY-MM-DD';

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/%DATE%.log`,
  datePattern: logFileFormat  
});

const winstonLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [    
    dailyRotateFileTransport    
  ]
});

if (logToConsole) {
  winstonLogger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    ),
    level: 'error'
  }));
}

let logger = {
  ...winstonLogger
}

logger.info = (source, message, { context = {}, alert = false, ...data } = {}) => {   
  const { request_id, headers, body, query, params } = context;
  const requestID = request_id || '-';

  winstonLogger.info(message, { source, requestID, headers, body, query, params, ...data });

}

logger.error = (source, message, { error, context = {}, ...data } = {}) => { 
  const { request_id, headers, body, query, params } = context;
  const requestID = request_id || '-';
  const errorStack = error && error.stack;
  
  winstonLogger.error(message, { source, requestID, error: errorStack, headers, body, query, params, ...data });

}

module.exports = logger
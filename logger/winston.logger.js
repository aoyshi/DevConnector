/* eslint-disable no-shadow */
const { createLogger, format, transports } = require('winston');
const moment = require('moment');

const { combine, timestamp, printf, label } = format;

const myFormat = printf(({ label, level, message, timestamp }) => `[${timestamp}] [${level.toUpperCase()}] ${label} ==> ${message}`);

const logger = function(filename) {
  return createLogger({
    format: combine(
      label({ label: filename }),
      timestamp({
        format: moment().format('YYYY-MM-DD HH:mm:ss'),
      }),
      myFormat,
      format.colorize({
        all: true,
      }),
    ),
    transports: [
      new transports.Console(),
      new transports.File({
        filename: '../logs/dev.log',
      }),
    ],
  });
};

module.exports = logger;

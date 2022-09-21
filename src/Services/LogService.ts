import * as log4js from "log4js";

// Configure the logger
log4js.configure({
    appenders: {
        out: {
            type: 'stdout',
        },
        app: {
            type: 'dateFile',
            filename: `logs/console.log`,
        },
        error: {
            type: 'dateFile',
            filename: `logs/error.log`,
        },
        appFilter: {
            type: 'logLevelFilter',
            appender: 'app',
            level: 'trace',
        },
        errorFilter: {
            type: 'logLevelFilter',
            appender: 'error',
            level: 'error',
        },
    },
    categories: {
        default: {
            appenders: ['out', 'appFilter', 'errorFilter'],
            level: 'trace',
        },
    },
});

export default log4js;
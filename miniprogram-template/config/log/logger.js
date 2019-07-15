import { env, envs } from '../env/env.js';

const levels_ = {
    FATAL: 'fatal',
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info',
    DEBUG: 'debug',
    TRACE: 'trace'
};

const currLevels_ = [];
currLevels_.push(levels_.FATAL);
currLevels_.push(levels_.ERROR);
currLevels_.push(levels_.WARN);
currLevels_.push(levels_.INFO);
if (env === envs.dev || env === envs.test) {
    currLevels_.push(levels_.DEBUG);
    currLevels_.push(levels_.TRACE);
}

const isParamNull_ = param => {
    if (param === null) {
        return true;
    }
    switch (typeof param) {
        case 'undefined':
            return true;
        case 'string':
            return param === '';
        case 'object':
            const isArray = Object.prototype.toString.call(param) === '[object Array]';
            if (isArray) {
                return param.length === 0;
            }
            return JSON.stringify(param) === '{}';
        case 'boolean':
            return false;
        case 'function':
            return false;
        default:
            return false;
    }
};

const log_ = (level, eventName, desc) => {
    const levelNames = [levels_.ERROR, levels_.FATAL, levels_.WARN];
    const eName_ = levelNames.indexOf(level) === -1 ? eventName : level;
    const param = { eventName, param: isParamNull_(desc) ? {} : desc };
    const isProduct = env === envs.product;
    const consoleMethod = level === levels_.FATAL ? levels_.ERROR : level;
    if (currLevels_.indexOf(level) !== -1) {
        isProduct ? this.send(eName_, param) : console[consoleMethod](`${level}:`, param);
    }
};

const log = {
    send(eventName, param) {
        // TODO: 可以接入如阿拉丁的日志: getApp().aldstat.sendEvent(eventName, param);
        console.log('don\'t send anything now', eventName, param)
    },

    fatal(eventName, param) {
        log_(levels_.FATAL, eventName, param);
    },

    error(eventName, param) {
        log_(levels_.ERROR, eventName, param);
    },

    warn(eventName, param) {
        log_(levels_.WARN, eventName, param);
    },

    info(eventName, param) {
        log_(levels_.INFO, eventName, param);
    },

    debug(eventName, param) {
        log_(levels_.DEBUG, eventName, param);
    },

    trace(eventName, param) {
        log_(levels_.TRACE, eventName, param);
    }
};

module.exports = {
    log
};

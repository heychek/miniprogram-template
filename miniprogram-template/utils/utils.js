import { log } from './logger.js';

const getFormater_ = date => {
  return {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };
};

const testDataReg_ = (date, res, formater) => {
  let res_ = res;
  if (/(y+)/.test(res_)) {
    res_ = res_.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  for (const k in formater) {
    if (formater.hasOwnProperty(k) && new RegExp(`(${k})`).test(res_)) {
      res_ = res_.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? formater[k] : `00${formater[k]}`.substr(`${formater[k]}`.length)
      );
    }
  }
  return res_;
};

const isReqObj_ = param => {
  const t = typeof param;
  return t !== 'string' && t !== 'number' && t !== 'boolean';
};

const getReqConn_ = paramStr => {
  return paramStr.indexOf('?') === -1 ? '?' : '&';
};

const getReqEncodeParam_ = (param, encode) => {
  return encode === null || encode ? encodeURIComponent(param) : param;
};

/**
 * 判断传入值是否未定义或为 null
 * @param obj
 * @returns {boolean}
 */
const isNull = (obj) => {
  return typeof obj === 'undefined' || obj === null;
};

/**
 * 判断传入参数是否为空
 * @param param
 * @returns {boolean}
 */
const isParamNull = param => {
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

/**
 * 判断是否是对象类型
 * @param param
 * @return {boolean}
 */
const isObj = param => {
  if (typeof param !== 'object') {
    return false;
  }
  const isArray = Object.prototype.toString.call(param) === '[object Array]';
  return !isArray;
};

/**
 * 判断传入参数是否为空
 * @param param
 * @return {Promise<boolean>}
 */
const isNullPro = param => {
  return new Promise(resolve => {
    if (param === null) {
      resolve(true);
    }
    switch (typeof param) {
    case 'undefined':
      resolve(true);
      break;
    case 'string':
      resolve(param === '');
      break;
    case 'object':
      const isArray = Object.prototype.toString.call(param) === '[object Array]';
      if (isArray) {
        resolve(param.length === 0);
      }
      resolve(JSON.stringify(param) === '{}');
      break;
    case 'boolean':
      resolve(false);
      break;
    case 'function':
      resolve(false);
      break;
    default:
      resolve(false);
    }
  });
};

/**
 * 判断字符串是否为空
 * @param str
 * @returns {boolean}
 */
const isStrNull = str => {
  return typeof str === 'undefined' || str === null || str === '';
};

/**
 * 判断数组是否为空
 * @param arr
 * @returns {boolean}
 */
const isArrNull = arr => {
  return typeof arr === 'undefined' || arr === null || arr.length === 0;
};

/**
 * 判断对象是否为空
 * @param obj
 * @returns {boolean}
 */
const isObjNull = obj => {
  return typeof obj === 'undefined' || obj === null || JSON.stringify(obj) === '{}';
};

/**
 * 传入对象和属性名字符串，返回该对象是否包含该属性的布尔值
 * @param obj
 * @param prop
 * @returns {boolean}
 */
const hasProperty = (obj, prop) => {
  if (isNull(obj) || isNull(prop)) {
    return false;
  }
  if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
    return false;
  }
  return typeof obj[prop] !== 'undefined';
};

/**
 * 传入对象和属性名字符串，返回该对象是否包含该属性或该属性是否为空的布尔值
 * @param obj
 * @param prop
 * @returns {boolean}
 */
const isPropertyNull = (obj, prop) => {
  if (isParamNull(obj)) {
    return true;
  }
  if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
    return true;
  }
  return isParamNull(obj[prop]);
};

/**
 * 格式化日期，传入日期字符串和需要格式化的结果样式字符串，返回格式化好的日期字符串
 * @param dateStr
 * @param fmt
 * @returns {string}
 */
const dateFormat = (dateStr, fmt) => {
  const isValidType = typeof dateStr === 'string' || typeof dateStr === 'number';
  if (isStrNull(dateStr) || !isValidType) {
    return '';
  }
  const date = new Date(dateStr);
  return testDataReg_(new Date(dateStr), fmt, getFormater_(date));
};

/**
 * 将页面路径传入，返回页面名称
 * @param path
 * @returns {string}
 */
const getPageName = path => {
  const index = path.lastIndexOf('\/');
  return path.substring(index + 1, path.length);
};

/**
 * param 将要转为URL参数字符串的对象
 * key URL参数字符串的前缀
 * encode true/false 是否进行URL编码,默认为true
 *
 * return {string} URL参数字符串
 */
const urlFormat = (param, key, encode) => {
  let paramStr = '';
  if (isObjNull(param)) {
    return '';
  }
  if (!isReqObj_(param)) {
    paramStr += `${key}=${getReqEncodeParam_(param, encode)}`;
  } else {
    for (const i in param) {
      if (!param.hasOwnProperty(i)) {
        continue;
      }
      const k = isStrNull(key) ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      const item = urlFormat(param[i], k, encode);
      if (isStrNull(urlFormat(param[i], k, encode))) {
        break;
      }
      paramStr += getReqConn_(paramStr) + item;
    }
  }
  return paramStr;
};

/**
 *  传入 rpx 单位的数字，转成 px 单位的数字
 * @param rpxSize
 * @returns {number}
 */
const rpxToPx = rpxSize => {
  const app = getApp();
  const rpxSysWidth = 750;
  const pxSysWidth = isObjNull(app.globalData.systemSize)
    ? wx.getSystemInfoSync().windowWidth
    : app.globalData.systemSize.width;

  return rpxSize * pxSysWidth / rpxSysWidth;
};

/**
 *  传入 px 单位的数字，转成 rpx 单位的数字
 * @param pxSize
 * @returns {number}
 */
const pxToRpx = pxSize => {
  const app = getApp();
  const rpxSysWidth = 750;
  const pxSysWidth = isObjNull(app.globalData.systemSize)
    ? wx.getSystemInfoSync().windowWidth
    : app.globalData.systemSize.width;

  return pxSize * rpxSysWidth / pxSysWidth;
};

/**
 * 输入的字符替换，只允许输入中文，字母和·
 * @param str 需要被匹配替换的来源字符串
 * @returns {string | void | *}
 */
const nameInputReplace = str => {
  return str.replace(/[^\u4E00-\u9FA5A-Za-z·]/g, '');
};

/**
 * 深拷贝对象
 * @param source 被拷贝的对象
 * @returns {object}
 */
const objDeepCopy = (source) => {
  const sourceCopy = {};
  for (const item in source) {
    if (source.hasOwnProperty(item)) {
      sourceCopy[item] = isObj(source[item]) ? objDeepCopy(source[item]) : source[item];
    }
  }
  return sourceCopy;
};

const deepClone = source => {
  return JSON.parse(JSON.stringify(source));
};

/**
 * 获取最小值到最大值之前的整数随机数，该最大/小值均包括在其内
 * @param Min 最小值
 * @param Max 最大值
 * @returns {number} 最小值到最大值之前的整数随机数
 */
const GetRandomNum = (Min, Max) => {
  const Range = Max - Min;
  const Rand = Math.random();
  return Min + Math.round(Rand * Range);
};

/**
 * 随机来源chars
 * @param n
 * @param chars 在chars中获取
 * @returns {string}
 */
const generateMixed = (n, chars) => {
  let res = '';
  for (let i = 0;i < n;i++) {
    const id = Math.ceil(Math.random() * 35);
    res += chars[id];
  }
  return res;
};

/**
 * 产生随机n位随机数
 * @param n 需要获取的随机数的位数
 * @returns {string}
 */
const RndNum = n => {
  let rnd = '';
  for (let i = 0;i < n;i++) {
    rnd += Math.floor(Math.random() * 10);
  }
  return rnd;
};

/**
 * 为了打印错误
 * @param err
 * @param tip
 * @param callback
 * @return {*}
 */
const promiseErr = (err, tip, callback) => {
  console.log(`${tip} err`, err);
  if (callback && typeof callback === 'function') {
    return callback(err);
  }
};

/**
 * @param callBack
 * @param logObj
 * @param logTip
 * @return {*}
 */
const toastHideBack = (callBack, logObj, logTip) => {
  wx.hideLoading();
  if (logObj) {
    const tip = logTip && typeof logTip === 'string' ? logTip : '成功';
    console.log(logTip || 'log is', logObj);
    wx.showToast({
      title: tip,
      icon: 'none',
      duration: 2000
    });
  }
  if (callBack) {
    return callBack();
  }
};

/**
 * @param callBack
 * @param logObj
 * @param logTip
 * @return {*}
 */
const hideBack = (callBack, logObj, logTip) => {
  wx.hideLoading();
  if (logObj) {
    console.log(logTip || 'log is', logObj);
  }
  if (callBack) {
    return callBack();
  }
};

/**
 * @param callBack
 * @param logObj
 * @param logTip
 * @return {*}
 */
const logBack = (callBack, logObj, logTip) => {
  if (logObj) {
    console.log(logTip || 'log is', logObj);
  }
  if (callBack) {
    return callBack();
  }
};

const logHideAndToErr = (logObj, tip) => {
  log.error(logObj, tip);
  wx.hideLoading();
  wx.reLaunch('/pages/notFound/notFound');
};

/**
 * @param logObj
 * @param logTip
 */
const hideLog = (logObj, logTip) => {
  wx.hideLoading();
  if (logObj) {
    console.log(logTip || 'log is', logObj);
  }
};

/**
 * 获取字符串中的文件名
 * @param str
 * @return {string}
 */
const getFileName = str => {
  let str_ = str;
  str_ = str_.substring(str_.lastIndexOf('/') + 1);
  str_ = str_.substring(0, str_.lastIndexOf('.'));
  return str_;
};

/**
 * 函数节流
 * @param fn 定时执行函数
 * @param gapTime  间隔时间
 * @returns {Function}
 */
const throttle = (fn, gapTime) => {
  const gapTime_ = gapTime || 1500;
  let _lastTime = null;

  return function () {
    const _nowTime = new Date();
    if (_nowTime - _lastTime > gapTime_ || !_lastTime) {
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, arguments);
      _lastTime = _nowTime;
    }
  };
};

/**
 * 函数防抖
 * @param fn 执行函数
 * @param wait 等待时间
 * @returns {Function}
 */
const debounce = function (fn, wait) {
  let timer = null;
  return function () {
    // eslint-disable-next-line no-invalid-this
    const that = this;
    const args = arguments;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function () {
      fn.apply(that, args);
    }, wait);
  };
};

/**
 * @param a
 * @param b
 * @return {boolean}
 */
const isStrEq = (a, b) => {
  return a === b;
};

const booleanVal = bol => {
  if (typeof bol === 'boolean') {
    return bol;
  }
  if (typeof bol === 'string' && bol === 'true') {
    return true;
  }
  if (typeof bol === 'string' && bol === 'false') {
    return false;
  }
  return false;
};

const max = arr => {
  let num = arr[0];
  for (let i = 0;i < arr.length;i++) {
    if (num < arr[i]) {
      num = arr[i];
    }
  }
  return num;
};

const getCompNode = (that, selector) => {
  return new Promise(resolve => {
    wx.createSelectorQuery()
      .in(that)
      .select(selector)
      .boundingClientRect(res => resolve(res))
      .exec();
  });
};

const getPageNode = selector => {
  return new Promise(resolve => {
    wx.createSelectorQuery()
      .select(selector)
      .boundingClientRect(res => resolve(res))
      .exec();
  });
};

module.exports = {
  isNull,
  isObj,
  isStrNull,
  isObjNull,
  isArrNull,
  isParamNull,
  isNullPro,
  hasProperty,
  isPropertyNull,
  dateFormat,
  getPageName,
  urlFormat,
  rpxToPx,
  pxToRpx,
  nameInputReplace,
  objDeepCopy,
  deepClone,
  GetRandomNum,
  generateMixed,
  RndNum,
  throttle,
  debounce,
  getFileName,
  promiseErr,
  hideBack,
  logBack,
  hideLog,
  logHideAndToErr,
  toastHideBack,
  isStrEq,
  booleanVal,
  getCompNode,
  getPageNode,
  max
};

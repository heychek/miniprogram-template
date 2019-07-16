const img404 = './img404.png';

const types = {
  NORMAL: 'normal',
  UNDEFINED: 'undefined',
  NULL: 'null',
  EMPTY: '',
  ERROR: 'error'
};

const getType = src => {
  if (typeof src === 'undefined') {
    return types.UNDEFINED;
  } else if (src === null) {
    return types.NULL;
  } else if (src === '') {
    return types.EMPTY;
  } else if (src === 'error') {
    return types.ERROR;
  }
  return types.NORMAL;
};

const log = str => {
  console.log(`===src in Img comp now is ${str}===`);
};

module.exports = {
  img404, types, getType, log
};

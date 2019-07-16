const data = {};

data.indextest = 'success';

const mock = url => {
  const res = {
    data: {
      code: 200,
      data: data[url.replace(/\/[0-9]*/g, '')],
      msg: ''
    }
  };
  console.log('mock response is', res, url, url.replace(/\//g, ''));
  return res;
};

module.exports = {
  mock
};

const errhandler = {};

errhandler.err1 = cb => {
  cb('请求超时，请检查网络后重试');
};

errhandler.err404 = cb => {
  cb('请求资源已转移或不存在，请联系管理员');
};

errhandler.err10000 = cb => {
  cb('请求失败，请稍后重试');
};

module.exports = {
  errhandler
};

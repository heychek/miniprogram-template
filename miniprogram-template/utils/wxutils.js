const modal = (tip, showCancel) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: tip || '是否确认该操作',
      showCancel: showCancel || true,
      success: res => {
        if (res.confirm) {
          console.log('用户点击确定');
          resolve();
        } else if (res.cancel) {
          console.log('用户点击取消');
          reject();
        }
      }
    });
  });
};

const noneToast = tip => {
  wx.showToast({
    title: tip || '成功',
    icon: 'none',
    duration: 2000
  });
};

module.exports = {
  modal,
  noneToast
};

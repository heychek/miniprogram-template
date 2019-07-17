import { isStrNull } from './utils';

const modal = (tip, showCancel) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: tip || '是否确认该操作',
      showCancel: showCancel || true,
      success(res) {
        if (res.confirm) {
          resolve();
        } else if (res.cancel) {
          reject();
        }
      }
    });
  });
};

const wxGetShareInfo = shareTicket => {
  return new Promise((resolve, reject) => {
    wx.getShareInfo({
      shareTicket,
      complete: res => resolve(res),
      fail: err => reject(err)
    });
  });
};

const noneToast = tip => {
  const isTipValid = !isStrNull(tip) && tip && typeof tip === 'string';
  if (isTipValid) {
    wx.showToast({
      title: tip && typeof tip === 'string' ? tip : '成功',
      icon: 'none',
      duration: 2000
    });
  }
};

const noneToastNotNull = tip => {
  if (typeof tip === 'string' && !isStrNull(tip)) {
    wx.showToast({
      title: tip,
      icon: 'none',
      duration: 2000
    });
  }
};

const successToast = (tip) => {
  wx.showToast({
    title: tip || '成功',
    icon: 'success',
    duration: 1000
  });
};

const redirect = url => {
  wx.redirectTo({
    url
  });
};

const navigate = url => {
  wx.navigateTo({
    url
  });
};

const switchTab = url => {
  wx.switchTab({
    url
  });
};

const reLaunch = url => {
  wx.reLaunch({
    url
  });
};

const isNull = obj => {
  return typeof obj === 'undefined' || obj === null;
};

const showLoading = (title, mask) => {
  wx.showLoading({
    title,
    mask: isNull(mask) ? true : mask
  });
};

const chooseImg = remainPicCount => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: remainPicCount,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => resolve(res.tempFilePaths),
      fail: () => reject()
    });
  });
};

const chooseVideo = () => {
  return new Promise((resolve, reject) => {
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: res => resolve(res),
      fail: () => reject()
    });
  });
};

module.exports = {
  modal,
  noneToast,
  noneToastNotNull,
  successToast,
  redirect,
  switchTab,
  navigate,
  reLaunch,
  showLoading,
  wxGetShareInfo,
  chooseImg,
  chooseVideo
};


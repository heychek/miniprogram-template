import grace from '../../config/grace.js';
import { getSessionKey } from '../../config/request/api.js';
import wx from '../../utils/wxutils.js';

grace.page({
  data: {},

  onLoad: () => {
    getSessionKey({ xx: 7 })
      .catch(errMsg => {
        wx.noneToast(errMsg);
        console.log('getSessionKey err is', errMsg);
      });
  }
});

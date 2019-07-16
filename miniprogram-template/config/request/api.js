import grace from '../grace.js';
import { errhandler } from './errhandler.js';
import { urlFormat } from '../../utils/utils.js';
import { envs, env } from '../env/env.js';
import { mock } from '../mock/mock.js';

const isMock = env === envs.dev;

const dealRes = (res, backs) => {
  try {
    errhandler[`err${res.status}`](backs.reject);
  } catch (err) {
    console.log('');
  }
  try {
    errhandler[`err${res.data.code}`](backs.reject);
  } catch (err) {
    backs.resolve(res);
  }
};

const baseGet_ = (url, opt) => {
  return new Promise((resolve, reject) => {
    if (isMock) {
      resolve(mock(url));
    } else {
      grace.http.get(`${url}${urlFormat(opt)}`)
        .then(res => dealRes(res, { resolve, reject }))
        .catch(err => {
          console.log('err', err);
          errhandler[`err${err.status}`](reject);
        });
    }
  });
};

const basePost_ = (url, opt) => {
  return new Promise((resolve, reject) => {
    if (isMock) {
      resolve(mock(url));
    } else {
      grace.http.post(url, opt)
        .then(res => dealRes(res, { resolve, reject }))
        .catch(err => {
          console.log('err', err);
          errhandler[`err${err.status}`](reject);
        });
    }
  });
};

const get_ = (url, opt) => {
  return new Promise((resolve, reject) => {
    baseGet_(url, opt)
      .then(res => resolve(res.data.data))
      .catch(err => reject(err));
  });
};

const post_ = (url, opt) => {
  return new Promise((resolve, reject) => {
    basePost_(url, opt)
      .then(res => resolve(res.data.data))
      .catch(err => reject(err));
  });
};

const getSessionKey = opt => {
  return get_('/index/test', opt);
};

const postSessionKey = opt => {
  return post_('/index/test/post', opt);
};

module.exports = {
  getSessionKey,
  postSessionKey
};

import axios from 'axios';
import * as utils from './index';

export const post = async (options: any, data?: any): Promise<any> => {
  if (typeof options == 'string') {
    options = {
      url: options,
    };
  }
  if (utils.isObject(data)) {
    options.data = data;
  }
  const res = await axios.request({
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    ...options,
    data: utils.param(options.data),
    method: 'post',
  });
  return res.data;
};

export const get = async (options: any, data?: any): Promise<any> => {
  if (typeof options == 'string') {
    options = {
      url: options,
    };
  }
  if (utils.isObject(data)) {
    options.data = data;
  }
  const res = await axios.get(options.url, {
    ...options,
    params: options.data,
  });
  return res.data;
};

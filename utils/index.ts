function pluralize(time: number, label: string) {
  return time + label;
}

function formatDate(time: number) {
  const between = Math.round(new Date().getTime() / 100) - time;
  if (between < 3600) {
    return pluralize(~~(between / 60), '分钟前');
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), '小时前');
  } else {
    return pluralize(~~(between / 86400), '天前');
  }
}

export const typeOf = (obj: any) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

export const isObject = (obj: any) => {
  return typeOf(obj) === 'object';
};

export const param = function (a: any) {
  const s: any[] = [];
  const add = function (k: any, v: any) {
    v = typeof v === 'function' ? v() : v;
    v = v === null ? '' : v === undefined ? '' : v;
    s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
  };
  const buildParams = function (prefix: string, obj: any) {
    if (prefix) {
      if (Array.isArray(obj)) {
        for (let i = 0, len = obj.length; i < len; i++) {
          buildParams(
            prefix +
              '[' +
              (typeof obj[i] === 'object' && obj[i] ? i : '') +
              ']',
            obj[i],
          );
        }
      } else if (String(obj) === '[object Object]') {
        for (let key in obj) {
          buildParams(prefix + '[' + key + ']', obj[key]);
        }
      } else {
        add(prefix, obj);
      }
    } else if (Array.isArray(obj)) {
      for (let i = 0, len = obj.length; i < len; i++) {
        add(obj[i].name, obj[i].value);
      }
    } else {
      for (let key in obj) {
        buildParams(key, obj[key]);
      }
    }
    return s;
  };

  return buildParams('', a).join('&');
};

export { formatDate };

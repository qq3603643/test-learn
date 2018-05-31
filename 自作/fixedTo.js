/** 保留至任意位数 **/
function fixedTo(v, n = 2) {
  const times = Math.pow(10, n);
  let _v = `${Math.round(v * times) / times}`;

  !_v.includes('.') && (_v += '.');

  const [pre, suf] = _v.split('.');

  return _v + '0'.repeat(n - (suf && suf.length) || 0);
}

/** 找出字符串中出现次数最多的字符 **/
function mostChart(v) {
  const tempJson = Array.prototype.reduce.call(v, (t, c) => {
    if (!t[c]) {
      t[c] = 1;
    } else {
      t[c] += 1;
    }

    return t;
  }, {});

  let most = 0;
  const chars = Object.keys(tempJson).reduce((t, c) => {
    if (tempJson[c] > most) {
      t = [c];
      most = tempJson[c];

      return t;
    }

    if (tempJson[c] == most) {
      t.push(c);
    }

    return t;
  }, []);

  return chars.length >= 2 ? chars : chars[0];
};

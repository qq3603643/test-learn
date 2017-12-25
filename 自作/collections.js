/**
 * JAVASCRIPT 代码收集
 * @author tangerine
 */

/**
 * 删除数组中元素
 * 返回被删除的元素
 */
const remove = (arr, func) => {
  arr.filter(func).reduce((res, item, ix) => {
    arr.splice(arr.indexOf(item), 1);
    return res.concat(item);
  }, Array());
};

// eg: remove([1, 2, 3, 4], n => n % 2 == 0) -> [2, 4]

/**
 * 扁平化数组
 */
const flatten = (arr) => [].concat(...arr);
const deepFlatten = (arr) => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v));

// eg: flatten([1, [2, 3, [4, 5]]]) -> [1, 2, 3, [4, 5]]
// eg: deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]

/**
 * 用指定值填充数组的指定区间
 */
const fillArray => (arr, val, start, end) => arr.map((item, i) => i >= start && i < end ? val : item);

// eg: fillArray([1, 2, 3, 4], '8', 1, 3) -> [1,'8','8',4]

/**
 * scrollToTop
 */
const scrollTop = () => {
  const t = document.documentElement.scrollTop || document.body.scrollTop;

  if (t > 0) {
    /** 通知浏览器在下一次重绘之前更新动画 **/
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
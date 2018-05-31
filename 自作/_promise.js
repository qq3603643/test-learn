const _fn = (ms) => new Promise((resolve, reject) => {
  setTimeout((number) => {
    resolve(number)
  }, ms, ms);
});
/** new Promise 时已经开始执行 setTimeout **/
_fn(1000);

/** promises.all 会等到最后一个promise执行完成才开始处理(并行 但等到耗时最长的结束) **/
console.time('promises');
Promise.all([1000, 2000, 4000, 3000].map(ms => _fn(ms))).then((ret) => {
  console.timeEnd('promises'); // 4000 左右
});

/** 立即执行返回的结果 (promise 独立) **/
[1000, 2000, 4000, 3000, 2500].map(ms => _fn(ms)).forEach((promise, ix) => {
  promise.then((number) => {
  	// console.log(number, ix);
  });
});

/** 按顺序执行返回的结果(并行 如果前面的耗时太长 将阻赛后面的结果处理 但是异步已经执行) **/
const promises = [1000, 2000, 4000, 3000, 2500].map(ms => _fn(ms));

const run = async () => {
  for (let promise of promises) console.log(await promise);
};
run();


/*** 依次执行 但时间累计 即一个函数执行时间1000 第二个执行时间为1000+2000 ... **/
const run2 = async () => {
  console.log(await _fn(1000));
  console.log(await _fn(2000));
  console.log(await _fn(3000));
  console.log(await _fn(4000));
  console.log(await _fn(5000));
};
run2();

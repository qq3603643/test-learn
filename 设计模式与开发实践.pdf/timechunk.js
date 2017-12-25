/**
 * 分时分数量利用ary中的数据执行一个函数
 * @param ary 数据
 * @param fn
 * @param count
 * @param t
 */
function timeChunk(ary, fn, count, t) {
  const _ary = ary.concat();
  let   _timer;

  const run = () => {
  	let __j = 0;
  	while(__j < count && _ary.length) {
      fn(_ary.shift());
      __j++;
  	}
  	console.log('----------------------------------');
  };

  return () => {
  	_timer = setInterval(() => {
		if (_ary.length) {
		  run();
		} else {
			clearInterval(_timer);
		}
  	}, t || 200);
  };
};

const ns = [];
let i = 0;
while (i < 1000) {
 ns[i] = i;
 i++;
}

const work = timeChunk(ns, (n) => {
  console.log(`Say Love ${n}th`);
}, 10, 1000);
work();

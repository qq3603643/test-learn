/**
 * 最简单迭代 each实现
 */
 const each = (list, fn) => {
 	if (!(list && list.length)){
 		return;
 	}

 	let i = 0;
 	const len = list.length;

 	while (i < len) {
 		const _ret = fn.call(list[i], list[i], i);

 		if (!_ret) {
 			break;
 		}

 		i += 1;
 	}
 };

 /**
  * 可控制流程迭代器实现 (外部迭代器)
  */
 const Iterator = (list) => {
 	let _ix = 0;

 	return {
 		getCurrentItem() {
 			return list[_ix];
 		},
 		next() {
 			_ix += 1;
 		},
 		isDone() {
 			return _ix >= list.length;
 		},
 		reset() {
 			_ix = 0;
 		}
 	};
 };

 const list = [1, 2, 3];
 const iterator = Iterator(list);

 while (!iterator.isDone()) {
 	console.log(iterator.getCurrentItem());
 	iterator.next();
 }

 /**
  * 实例 通过多添加获取想要的结果
  * 这样做的好处 在于如果以后新增获取对象 直接新增一个获取函数即可
  */
 const getA = () = {
 	if (condition_1) {
 		return A;
 	}

 	return false;
 };

 const getB = () => {
 	if (condition_2) {
 		return B;
 	}
 };

 const getObjIterator = (...args) => {
 	if (!args.length) {
 		return null;
 	}

 	let i = 0;
 	let ret = null;
 	const len = args.length;

 	while (i < len) {
 		const _ret = args[i]();

 		if (_ret) {
 			ret = _ret;
 			break;
 		}

 		i += 1;
 	}

 	return ret;
 };

 getObjIterator(getA, getB);
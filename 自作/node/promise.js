// var p = new Promise(function(resolve, reject)
// {
// 	var data = { name: 'apple' };
// 	setTimeout(function(){
// 		resolve(data)
// 	}, 1000)
// })

// p.then(function(data)
// {
// 	console.log('first data')
// 	setTimeout(function(){
// 		console.log('return data')
// 		return data;
// 	}, 3000)
// }).then(function(da){ console.log('recieve data', da) /* data: undefined 如果前面没settimeout则正常接受 **/ })

// var promises = [];

// function createP(times, data) {
// 	if (times < 500) {
// 		return null;
// 	}

// 	return new Promise(function(resolve, reject) {
// 		// if (times > 2000) {
// 		// 	reject(new Error('long time'));
// 		// }
// 		setTimeout(function() {
// 			resolve(data);
// 		}, times);
// 	})
// }

// Array(1000, 500, 2000, 230, 700).forEach((times, index) => {
// 	promises.push(createP(times, index));
// });

// var someAsyncThing = function() {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			reject(new Error('first wrong'));
// 		}, 1000)
// 	})
// };

// someAsyncThing().then(() => {
// 	return Promise.all(promises);
// }).then((list) => { console.log(list) }).catch((er) => { console.log(er) });
/**
 * summary: 无论单个promise的返回时间的长短 返回结果的顺序是按promise的发起顺序
 * 当promises中存在null时 list中的返回值也为null;
 * 单个promise错误变进入catch中不再执行Promise.all().then操作 但是执行单个promise里面的操作
 */

const P = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('name', 'apple');
	}, 1000)
});

P.then((data1, data2) => {
	console.log(data1, data2);
})

/**
 * resolve 只能传递一个参数
 */
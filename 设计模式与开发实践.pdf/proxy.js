/**
 * 代理实现预加载图片
 */

 /* 基础模块 & 功能 */
 const create = (where, style) => {
 	return () => {
 		const img = document.createElement('img');

 		if (style) {
 			/***/
 		}

 		where.appendChild(img);

 		return (src) => {
 			img.src = src;
 		};
 	};
 };

 const createImg = create(document.body)();

 /* 代理 */
 const proxyCreateImg = (src) = {
 	const proxyImg = new Image();

 	createImg('loading.gif');
 	proxyImg.src = src;
 	proxyImg.onload = () => {
	   createImg(src);
 	};
 };


 /**
  * 代理 合并HTTP请求
  */

 /* base fun */
 const send = (id) => {
 	Ajax.post(url, id);
 };

 const proxySend = () => {
 	const ids = [];
 	let timer = null;

 	return (id) => {
	  ids.push(id);
	  if (timer) {
	  	/* sending */
	  	return;
	  }

	  timer = setTimeout(() => {
	  	send(url, ids.join(','));
	  	ids = [];
	  	timer = null;
	  	clearTimeout(timer);
	  }, 2000);
 	};
 }();
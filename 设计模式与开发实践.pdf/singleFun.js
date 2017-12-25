/**
 * 只需创建一个实例
 * 之后循环利用
 */

 /*
  * 例子: web qq 登陆弹窗
  */
 const createDiv = () => { console.log('create div');return {}; };
 const createLoginLayer = (() => {
 	let div = null;

 	return function() {
 	  if (!div) {
 	  	return div = createDiv();
 	  }

 	  return div;
 	};
 })();

 /**
  * btn.onclick = () = {
  *    const div = createLoginLayer();
  *    dov.style.display = 'block';
  * }
  */


  /**
   * 创建通用单例函数
   */
  const getSingle = (fn) => {
  	let ret = null;

  	return () => {
	  if (!ret) {
	  	return ret = fn.apply(this, arguments);
	  }

	  return ret;
  	};
  };

  const _createLoginLayer = getSingle(createDiv);
  _createLoginLayer();

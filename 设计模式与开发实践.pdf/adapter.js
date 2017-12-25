/**
 * 适配器模式
 * @实例
 */
function renderHtml(data) {
  /**
   * data: Array<{ name: string, age: string }>
   */

  return data.reduce((ret, _data) => {
    return `${ret}<div><h2>${data.name}</h2></div><ol><li>${data.age}</li></ol>`;
  }, String());
}

/**
 * long after a long time, data's structure changed
 * data: { [name]: { age: string } }
 */
function renderHtmlAdapter(data, oldFn) {
  const format = (json) => {
  	return Object.keys(json).reduce((ret, _k) => {
  	  return ret.concat({
  	  	name: _k,
  	  	...json[_k]
  	  });
  	}, Array());
  };

  return oldFn(format(data));
}
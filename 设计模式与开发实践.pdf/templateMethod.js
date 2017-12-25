/** 模板方法
 *  实例: 抽象beverage饮料 tea coffee实例继承
 */

class Beverage {
  /* 烧水 */
  boilWater() {
    console.log('boil water');
  }

  /* 添加原料 */
  brew() {
  	throw new Error('must brew');
  }

  /* 将饮料倒入杯中 */
  pourInCup() {
  	throw new Error('must pourInCup');
  }

  /* 添加调料 */
  addCondiments() {
  	throw new Error('must addCondiments');
  }

  /* init */
  init() {
  	this.boilWater();
  	this.brew();
  	this.pourInCup();
  	this.addCondiments();
  }
}

class Tea extends Beverage {
  brew() {
  	console.log('brew tea');
  }

  pourInCup() {
  	console.log('pour tea in cup');
  }

  addCondiments() {
  	console.log('add tea condiments');
  }
}

new Tea().init();

class Coffee extends Beverage {
}

Function.prototype.before = function(fn) {
  const _self = this;

  return async function () {
  	const ret = await fn();

  	_self(ret);
  }
};

const a = (name) => {
  console.log(`my name is ${name}`);
};

const a1 = a.before(() => {
  return new Promise((resolve, reject) => {
  	resolve('apple');
  });
});

a1();
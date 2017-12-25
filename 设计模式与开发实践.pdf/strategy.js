const getMoney = {
	'S': value => value * 5,
	'A': value => value * 4,
	calc: (level, value) => getMoney[level](value);
};

getMoney.calc('A', 1000);

/** 函数式 */
function S(value) { return value*5 };
function calc(fun, value) { return fun(value) };
calc(S, 1000);


/**
 * 验证表单
 */

 const strategy = {
 	isEmpty(value, msg) {
 		if (!value) return msg;
 	},
 	isNumber(value, msg) {
 		if (!(/^\d+$/).test(value)) return msg;
 	}
 };

 const validateForm = function(form) { this.form = form; this.ache = []; };
 validateForm.prototype.add = function(domName, rule, msg) {
 	const _dom = this.form[domName];
 	const _value = _dom.value;

 	this.ache.push(function() {
 		return strategy[rule](_value, msg);
 	});
 };
 validateForm.prototype.start = function() {
 	let msg = '';
 	if (!(this.ache && this.ache.length)) {
 		return msg;
 	}

 	let i = 0;
 	let f = null;
 	while (f = this.ache[i]) {
	   if (f()) {
	   	msg = f();
	   	break;
	   }
 	   i += 1;
 	}

 	return msg;
 };

 /**
  * submit.onclick = () => {
  *   const _valiteF = new validateForm(document.querySelect('#form'));
  *   _valiteF.add('name', 'isEmpty', 'name is necessary!');
  *
  *    const _msg = _valiteF.start();
  *    if (_msg) { alert(_msg); return false; }
  *
  *    $.ajax()   .....
  * };
  */
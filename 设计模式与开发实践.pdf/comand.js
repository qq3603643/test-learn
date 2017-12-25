/**
 * 实例1 按钮点击 & 触发事件
 * 事件接受者: receiver
 * 时间触发者 btn
 * btn 对 receiver中的行为并不关心
 */

function BindCommand(receiver, btn) {
	this.receiver = receiver;
	this.btn = btn;
}

BindCommand.prototype.execute = function () {
	Object.keys(this.receiver).forEach(function(type) {
		this.btn[`on`${type}] = this.receiver[type];
	});
};

BindCommand.prototype.undo = function() {
	Object.keys(this.receiver).forEach(function(type) {
		this.btn[`on`${type}] = null;
	});
}

const clickCommand = new BindCommand({ click: function(dom) { console.log(dom.className) } }, aBtn);

clickCommand.execute();

/**
 * 命令模式实现回放
 */
 const receiver = {
 	attack() {
 		console.log('gong ji');
 	},
 	jump() {
 		console.log('tiao');
 	}
 };

 const keyboardMap = {
 	'37': 'attack',
 	'36': 'jump'
 };

 function makeCommand(receiver, type) {
 	return receiver[type];
 }

 const commands = [];
 document.onkeypress = function (e) {
 	const keyboard = e.keyCode;
 	const command = makeCommand(receiver, keyboardMap[keyboard]);

 	command && (command(), commands.push(command));
 }

 /* backPlay */
 commands.forEach(command => command());
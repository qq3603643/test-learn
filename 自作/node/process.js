/*
	process.pid
	process.version
	process.platform
	process.title
	## process.argv ##
		获取执行命令的参数 如 node process.js arg_one arg_two
		此时process.argv的值为 [ node, process.js, arg_one, arg_two ]
	## process.env  ##
		set NODE_ENV=development && node process.js
		此时在processs里面获取process.env.NODE_ENV 为 development
	process.execPath
	process.stdout
	process.stdin
	process.stderr
**/

const argvs = process.argv;

console.log(`argv :`, argvs);

const environment = process.env;

// for( var k in environment )
// 	console.log(k, environment[k]);

console.log(environment.NODE_ENV);

var str = '';
// process.stdin.resume();
process.stdout.write('start your perform \n-----------------------------\n')
process.stdin.setEncoding('UTF8');

process.stdin.on('data', thunk =>
{
	var _in = thunk.slice(0, -2);    //remove \n

	if(_in === '')
	{
		process.stdin.emit('end');
		return;
	}

	str += _in;
})
process.stdin.on('end', () =>
{
	process.stdout.write(`your input: ${ str }`);
})
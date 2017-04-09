const fs = require('fs'),
	  content = { name: 'rabbit' };

/*
	fs.writeFile(filename, data, [options], [callback(err)])
	# option #
		encoding: 'UTF8' (default)
		mode: ''
		flag: 'r/r+/w/w+/a/a+'(common)
**/

function test(a, b)
{
	debugger;
	var c = a + b;

	c *= 2;

	c += 2;
}

test(1, 2);

fs.writeFile('./output/output_new2.txt',
			/* 添加时间戳之后写入失败 大概是解析文件类型的错误 **/
			// './output/output_new2.txt?t='+ new Date()*1
			JSON.stringify(content),
			{
				flag: 'a'   //追加形式写入
			},
			(err) =>
			{
				if(!err) console.log('success');
				else 	 console.log(err);
			})
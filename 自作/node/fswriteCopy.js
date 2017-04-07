const fs = require('fs'),
	  content = { name: 'rabbit' };

/*
	fs.writeFile(filename, data, [options], [callback(err)])
	# option #
		encoding: 'UTF8' (default)
		mode: ''
		flag: 'r/r+/w/w+/a/a+'(common)
**/

fs.writeFile('./output/output_new2.txt',
			JSON.stringify(content),
			{
				flag: 'a'   //追加形式写入
			},
			(err) =>
			{
				if(!err) console.log('success');
			})
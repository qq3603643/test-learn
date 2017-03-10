const fs = require('fs');

// var writerStream = fs.createWriteStream('./output/output_new.txt'),
// 	readerStream = fs.createReadStream('./origin/origin.txt');

/*
	1 覆盖式  目标文件的内容被完全覆盖
	2 可新建  目标文件不存在时新建
**/
// readerStream.pipe(writerStream);

var writerStream = fs.createWriteStream('./output/output_new2.txt'),
	data = [{name: 'name1'}, {name: 'name2'}];

writerStream.write(JSON.stringify(data), 'UTF8');
writerStream.end();

writerStream.on('finish', () =>
{
	console.log('write success');
})
writerStream.on('error', (error) =>
{
	console.log(error)
})
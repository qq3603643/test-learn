/*
  使用copy.js -a -b  将a复制至b
**/

var args = process.argv,
    filePaths = args.splice(2);

if(filePaths.length != 2)
{
	console.log('node command is wrongful');
	return;
}

var originalPath = filePaths[0],
	newPath = filePaths[1];

console.log('将'+ originalPath +'复制至'+ newPath);

var fs = require('fs');

function copy(src, dst)
{
	fs.stat(src, function(err, st)
	{
		if(err)
		{
			console.log('encounter a error reading '+ src);
			return;
		}

		if(st.isFile())
		{
			console.log(src + ' is a file');

			var readerStream = fs.createReadStream(src),
				writerStream = fs.createWriteStream(dst);

			readerStream.pipe(writerStream);

			writerStream.on('finish', function()
			{
				console.log('file '+ src +' copy completed');
			})

			return
		}
		if(st.isDirectory())
		{
			console.log(src + ' is a dir');
			exists(src, dst, function(src, dst)
			{
				fs.readdir(src, function(err, paths)
				{
					if(err)
					{
						console.log('encounter a error to read '+ src);
						return;
					}

					paths.forEach(function(path)
					{
						var _src = src + '/' + path,
							_dst = dst + '/' + path;

						copy(_src, _dst);
					})
				})
			})
		}
	})
}

function exists(src, dst, cb)
{
	var isExist = fs.existsSync(dst);

	if(!isExist)
	{
		fs.mkdir(dst, function(err)
		{
			if(err)
			{
				console.log('encounter a error makedir: '+ dest);
				return;
			}
			console.log('dir '+ dst + ' is maked completed');
			cb(src, dst);
		})

		return;
	}
	cb(src, dst);
}

copy(originalPath, newPath);

/*
	## summary ##
		- 用process.argv 获取传入的参数 即新老文件路径
		- fs.stat 读取路径信息 主要作用为判断为文件或者目录
		- fs.existsSync 同步判断目录是否存在 利用回调达到代码复用 (fs.exists异步版本官方已经弃用 不建议使用)
		- stream 操作文件时 当目录不存在时报错 需要新建 当文件不存在时自动新建
**/
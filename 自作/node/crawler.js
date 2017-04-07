const fs   = require('fs'),
	  cheerio = require('cheerio'),
	  request = require('request');

request('https://www.ypzdw.com', function(err, res, body)
{
	const $ = cheerio.load(body);

	const $imgs = $('img');

	$imgs.each(function(i, item)
	{
		var src = $(item).attr('src');

		downloadImg(
			src,
			'./ypzdw/imgs/'
			);
	})
})

function downloadImg(src, dst)
{
	createDir(dst);

	var imgName = src.substr(src.lastIndexOf('/') + 1).split('?')[0],
		target  = dst.lastIndexOf('/') == dst.length
				  ? dst + imgName
				  : dst + '/' + imgName;

	var writerStream = fs.createWriteStream(target)
	request(src).pipe(writerStream);

	writerStream.on('error', function(err)
	{
		console.log(err)
	})
	writerStream.on('finish', function()
	{
		console.log(imgName + ' download completed');
	})
}

/* createDir('a/b/c') **/
function createDir(path)
{
	if(!fs.existsSync(path))
	{
		if(!(/^\/|^\./.test(path)))                  /* 自动填充为当前目录 **/
			prefix = '.';
		else
		{
			/* 匹配目录层级 **/
			path =
			path.replace(/(.*?)\/(\w+)/, function($, $1, $2)
			{
				prefix = $1;
				return $2;
			})
		}

		path.split('/').reduce(function(_path, v)
		{
			var _dir = _path + '/' + v;

			if(!fs.existsSync(_dir))
				fs.mkdirSync(_dir);

			return _dir;
		}, prefix)
	}
}

/*
	## summary ##
		- 选择物request模块的原因 支持重定向的处理 以及下载文件等功能的支持
**/
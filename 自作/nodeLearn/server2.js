const express = require('express'),
	  static = require('express-static'),
	  bodyParser = require('body-parser'),
	  multer = require('multer'),
	  cookieParser = require('cookie-parser'),
	  sessionParser = require('cookie-session'),
	  pathLib = require('path'),
	  fs = require('fs'),
	  consolidate = require('consolidate');

var server = express();

//cookie
server.use(cookieParser('19940604'));

//session
server.use(
	sessionParser({
		name: 'sess',
		keys: (function(){
			var arr = new Array();
			while(arr.length < 10000)
				arr.push('keys_' + Math.random());

			return arr;
		})(),
		maxAge: 20 * 36e5
	})
	);

//post
server.use(bodyParser.urlencoded({ extended: !1 }));
//file
server.use(multer({dest: './www/upload'}).any());

//upload
server.use('/upload', (req, res, next) =>
{
	// console.log(req.query, req.body, req.files[0], req.cookies, req.session);
	/*
		文件已经上传成功 只是做个重命名而已
		例如这里的file.path 为www/upload/**** 已经是在服务端了
	**/

var error = [];

function renameFile(file, i, files)
{
	const path = file.path,
		  orgName = file.originalname,
		  ext  = orgName.substr(orgName.lastIndexOf('.')),
		  savePath = path + ext;

	fs.rename(path, savePath, function(err)
	{
		if(err)
		{
			error.push('file '+ orgName +' is failed to rename');
		}
		if(i == files.length-1)
		{
			console.log(error);
			if(error.length)
				res.send('error: ' + error.join(',')).end();
			else
				res.send('done');
		}
	})
}

req.files.forEach(renameFile);

})

//typeof input
server.set('view engine', 'html');
//original file path
server.set('views', './www/template');
//typeof engine
server.engine('html', consolidate.ejs);

//template render
server.use('/', require('./routers/index.js')());

//static
server.use(static('./www'));

server.listen(8888, function(err)
{
	if(err)
	{
		console.log(err);
		return;
	}

	console.log(8888 + ' is listenning')
});
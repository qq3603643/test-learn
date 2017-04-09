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

    const file = req.files[0],
    	  path = file.path,
    	  ext  = pathLib.parse(file.originalname).ext,
    	  newPath = path + ext;

    fs.rename(path, newPath, function (err)
    {
    	if(!err)
    		res.send('done');
    	else
    		res.send('fail');
    })
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

server.listen(8888);
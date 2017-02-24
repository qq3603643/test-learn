const express = require('express'),
	  static = require('express-static'),
	  bodyParser = require('body-parser'),
	  multer = require('multer'),
	  cookieParser = require('cookie-parser'),
	  sessionParser = require('cookie-parser'),
	  pathLib = require('path'),
	  fs = require('fs'),
	  jade = require('jade'),
	  ejs = require('ejs');

var server = express();

//Cross domain
server.all('*', (req, res, next) =>
{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");

	next();
});

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


//deal browser req
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

server.post('/getInfo', (req, res, next) =>
{
	console.log(req.body);
	res.send({ name: 'apple' });
})
server.get('/getName', (req, res, next) =>
{
	console.log(req.query);
	res.send({ name: 'tangerine' });
})

//static
server.use(static('./www'));

server.listen(8888);
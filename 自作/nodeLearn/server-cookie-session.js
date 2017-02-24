const express = require('express'),
	  expressStatic = require('express-static'),
	  queryString = require('querystring'),
	  coookieParser = require('cookie-parser'),
	  cookSession = require('cookie-session');

const server = express();
const COOKIE_SECRET = '19940604';


server.use((req, res, next)=>
{
	var POST = new String();

	req.on('data', (data)=>
	{
		POST += data;
	})
	req.on('end', ()=>
	{
		req.body = queryString.parse(POST);
		next();
	})
})


server.use(coookieParser(COOKIE_SECRET));  //中间件 解析cookie 在req上添加 req.cookies
server.use(cookSession(
		{
			name: 'sess',
			keys: (function()
				  {
				  	var arr = new Array();
				  	while(arr.length < 10000) arr.push('sig_' + Math.random());  //keyItem不能为纯数字
				  	return arr;
				  })(),
			maxAge: 31 * 24 * 36 * 100000
		}
	));


server.use('/', (req, res, next)=>
{
	res.cookie('user', 'apple', { path: '/', maxAge: 1*24*60*60 });  //种植cookie用res
	console.log(req.cookies, req.signedCookies);

	req.session['count'] = req.session['count'] ? ++ req.session['count'] : 1;  //种植session用req
	console.log(`session: ${ req.session['count'] }`);

	next();
})

server.get('/getInfo', (req, res)=>
{
	res.send(
			{
				name: 'apple'
			}
		);

})

server.use(expressStatic('./www'));

server.listen(2234);
const express = require('express'),
      expressStatic = require('express-static'),  //静态资源
      querystring = require('querystring');

const server = express();

server.listen(6789);

server.use(function(req, res, next)   //前面无url 代表所有请求
{
	var str = '';
	req.on('data', function(data)
	{
		str += data;
	})

	req.on('end', function()
	{
		req.body = querystring.parse(str);

		next();  //向下传递de req保留现在的修改
	})
})

server.get('/login', function(req, res)
{
	console.log(req.query);
	res.send({ status: 1, msg: 'OK', data: { name: 'tangerine' } });
})

server.use('/loginPost', function(req, res)
{
	console.log(req.body, req.query);
	res.send({ status: 0, msg: 'ERROR', data: { name: '' } });
})

server.use(
	expressStatic('./www')
	);
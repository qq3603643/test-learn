const express = require('express');

module.exports = () =>
{
	const router = express.Router();

	router.get('/', (req, res, next) =>
	{
		//guess 这里的render为异步操作 所以不能在其后添加res.end() next();
		/**
		 * <%- ... %> 不转义输出
		 * <%= ... %> 转义部分
		 * <%  ... %> 流程控制 -> 逻辑代码 eg: if for...
		 */
		res.render('index.ejs', { name: 'apple', data: [{ a: 'a', b: 'b' }] });
	})

	//Cross domain( deal browser request)
	router.all('*', (req, res, next) =>
	{
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		res.header("X-Powered-By",' 3.2.1');
		res.header("Content-Type", "application/json;charset=utf-8");

		next();
	});
	router.post('/getInfo', (req, res, next) =>
	{
		console.log(req.body);
		res.send({ name: 'apple' });
	})
	router.get('/getName', (req, res, next) =>
	{
		console.log(req.query);
		res.send({ name: 'tangerine' });
	})
	router.get('/login', (req, res, next) =>
	{
		console.log(req.query);
		res.send({ status: 1, msg: 'success' })
	})
	router.post('/formdataUp', (req, res, next) =>
	{
		/* 非文件直接获取 **/
		const id = req.body.id;console.log(req.body)

		console.log(req.files);

		res.send('done')
	})

	return router;
};
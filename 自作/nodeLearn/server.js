const http = require('http'),
	  fs = require('fs');

const urlLib = require('url');

const server = http.createServer((req, res)=>{
	// !0 => parse with query ;
	const URL_PARSED = urlLib.parse(req.url, !0),
		  fileName = './www' + URL_PARSED.pathname;

	fs.readFile(fileName, (err, data)=>{

		if(err)
			res.write('不是有效网址')
		else
			res.write(data);

		res.end();
	})

	const GET = URL_PARSED.query;
	console.log(`get: ${GET.toString()}`);

	var POST;
	req.on('data',(data)=>{
		POST += data;
	})
	req.on('end', ()=>{
		console.log(`post: ${POST}`)
	})
})

server.listen(2333);
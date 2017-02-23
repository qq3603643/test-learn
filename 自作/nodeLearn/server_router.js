const express = require('express');

const server = express();

const userRouter = express.Router();

server.use('/user', userRouter);

userRouter.get('/info', function(req, res)
{
	res.send('hell world');
})


server.listen(8080);
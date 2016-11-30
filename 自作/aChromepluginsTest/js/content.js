console.log('welcome to ' + window.location.href.match(/(?:https?\:\/\/\w+\.)([^.]+)/ig)[0].split('.')[1] + ';');

$(function(){
	/**
	*可理解为ajax类的东西；
	*background.js为后台类的东西；
	*/
	chrome.extension.sendMessage(
		{
			purpose: 'setTitle',
			tabTitle: document.title
		},
		function(t)
		{
			//who care?
			console.log(t);
		}
	)

	void function getScript()
	{
		var htmlTotal = $('html').html(),
			reScript = /<script[^<>]*>((?!<\/?script[^<>]*>).)*<\/script>/g;

		// console.log(htmlTotal.match(reScript));
	}();
})
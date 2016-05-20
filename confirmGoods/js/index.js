$(function(){

var confirmGoods = function(){
	var  $calcBox = $('.calcTotal'),
		 timerHideBottom = null,
		 confirm = {
		 	calcBoxKeepBottom: function(){
		 		clearTimeout(timerHideBottom);
		 		$calcBox.css({'visibility':'hidden','opacity':'0'});
		 		var calcBoxHeight = $calcBox.height(),scrollTop = $(window).scrollTop(),
		 			itop = $(window).height()-calcBoxHeight+scrollTop;
		 		    $calcBox.css({'top':itop});
	 		    
	 		    timerHideBottom = setTimeout(function(){ $calcBox.animate({
	 		    	'opacity':'1',
	 		    	'visibility':'visible'
	 		    }),400},400)
		 	},
		 	run: function(){
		 		confirm.calcBoxKeepBottom();
		 		$(window).on({
		 			'scroll':confirm.calcBoxKeepBottom,
		 			'resize':confirm.calcBoxKeepBottom
		 		});
		 	}
		 };

	 return {
	 	'run': confirm.run
	 };
}();

// a标签active的兼容(绑定一个空事件)
$('a').on('touchstart',function(){});

//结算相关
confirmGoods.run();

})
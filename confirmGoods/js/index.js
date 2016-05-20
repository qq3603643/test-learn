$(function(){

var confirmGoods = function(){
	var  $calcBox = $('.calcTotal'),
		 timerHideBottom = null,
		 confirm = {
		 	keepBottom: function(){
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
		 		confirm.keepBottom();
		 		$(window).on({
		 			'scroll':confirm.keepBottom,
		 			'resize':confirm.keepBottom
		 		});
		 	}
		 };

	 return {
	 	'run': confirm.run
	 };
}();

confirmGoods.run();

})
$(function(){

var confirmGoods = function(){
	var  $calcBox = $('.calcTotal'),
		 confirm = {
		 	keepBottom: function(){
		 		var calcBoxHeight = $calcBox.height(),scrollTop = $(window).scrollTop(),
		 			itop = $(window).height()-calcBoxHeight+scrollTop;

		 		$calcBox.css({'top':itop})
		 	},
		 	run: function(){
		 		confirm.keepBottom();
		 		$(window).on('scroll',confirm.keepBottom)
		 	}
		 };

	 return {
	 	'run': confirm.run
	 };
}();

confirmGoods.run();

})
$(function(){

var confirmGoods = function(){
	var  
		$calcBox = $('.calcTotal'),
		timerShowBottom = null,
		confirm = {
		 	goodsInfoListHide: function(){
		 		
		 	},
		 	countBoxShow: function(){

		 	},
		 	limitCount: function($ele,maxValue){

		 		var number = $ele.text()*1;
		 		if(number<0) number = 0;
		 		if(number>maxValue){
		 			alert('最大数量为：'+maxValue);
		 			number = maxValue;
		 		}
		 		$ele.text(number);
		 	},
		 	amountChangeEvent: function(e){

		 		var _this = $(e.target),
		 			countEle = _this.siblings('.countGoods'),
		 			targetClass = e.target.className,
		 			number = countEle.text()*1;

	 			//增加
	 			if(~targetClass.indexOf('countPlus')){
	 				countEle.text(number+1);
	 			}
	 			//减少
	 			if(~targetClass.indexOf('countMinus')){
	 				countEle.text(number-1);
	 			}
	 			confirm.limitCount(countEle,1000);
		 	},
		 	run: function(){

		 		//加减按钮
		 		$('.goodsCountActi').off('touchstart').on('touchstart','.countPlus,.countMinus',function(e){
		 			var e = e||window.event;
		 			confirm.amountChangeEvent(e);
		 		})
		 	}
		 };

	 return {
	 	'inte': confirm.run
	 };
}();

var keyboardMine = function(){
	var 
		self,appearOnff = !0,
		index,
		boardHtml = '<div class="y-keyboard">'
		+'<h2><span class="y-keyboard-completed">完成</span></h2>'
		+'<span class="y-keyboard-item borderR">1</span>'
		+'<span class="y-keyboard-item borderR">2</span>'
		+'<span class="y-keyboard-item">3</span>'
		+'<span class="y-keyboard-item borderR">4</span>'
		+'<span class="y-keyboard-item borderR">5</span>'
		+'<span class="y-keyboard-item">6</span>'
		+'<span class="y-keyboard-item borderR">7</span>'
		+'<span class="y-keyboard-item borderR">8</span>'
		+'<span class="y-keyboard-item">9</span>'
		+'<span class="y-keyboard-item borderR bg-silver none">清除</span>'
		+'<span class="y-keyboard-item borderR">0</span>'
		+'<span class="y-keyboard-item bg-silver delete">删除</span>'
	'</div>',
		keyboardE = {
			layOut: function(){

				$('body').append(boardHtml);
				$('.y-keyboard').css({
					'top':$(window).height()+$(window).scrollTop(),
					'display':'none'
				})
			},
			appear: function(){		

				$('html,body').addClass('banScroll');
				//出现之前先将其重置在可见范围下面
				$('.y-keyboard').css({'display':'block',
									  'top':$(window).height()+$(window).scrollTop()
				});
				var target = $('.y-keyboard').offset().top - $('.y-keyboard').height();
				$('.y-keyboard').animate({top: target+'px'}, 300,function(){
					appearOnff = !0;
				})
			},
			disAppear: function(){

				var target = $('.y-keyboard').offset().top + $('.y-keyboard').height();
				$('.y-keyboard').animate({top: target+'px'}, 200,function(){
					$('.y-keyboard').css({'display':'none'});
					$('html,body').removeClass('banScroll');
				})
			},
			numberLimit: function(value,maxValue){

				if(value.length==0){
					self.eq(index).text('0');return false;
				}
				value*=1;
				if(value>maxValue){
					alert('最大数量为：'+maxValue);
					self.eq(index).text(maxValue);return false;
				}
				self.eq(index).text(value);
			},
			outPutEvent: function(e){

				var e = e||window.event,
				    targetEle = e.target,
					targetClass = targetEle.className,
					targetTagName = targetEle.tagName;
					if(targetTagName.toLowerCase() !== 'span') return false;

				//console.log(targetClass);
				//清除
				if(~targetClass.indexOf('none')){
					self.eq(index).text('');
					return false;
				};
				//完成
				if(~targetClass.indexOf('completed')){
					self.eq(index).removeClass('act-active');
					keyboardE.disAppear();
					keyboardE.numberLimit(self.eq(index).text(),1000);
					return false;
				}
				//删除
				if(~targetClass.indexOf('delete')){
					var number = self.eq(index).text();
					number+='';
					if(number){ self.eq(index).text(number.substr(0,number.length-1)) };
					return false;
				}
				//数字键
				self.eq(index).text(self.eq(index).text()+$(targetEle).text());
				keyboardE.numberLimit(self.eq(index).text(),1000);
			},
			run: function($ele){

				keyboardE.layOut();
				self=$ele;
				
				self.on('touchstart',function(){
					appearOnff && keyboardE.appear();
					appearOnff = false;
					index = $(this).closest('.goodsCountActi').index();  //通过全局的index变量锁定用户当前操作的键盘元素
					self.removeClass('act-active').eq(index).addClass('act-active');
					$('.y-keyboard').off('touchstart').on('touchstart',keyboardE.outPutEvent);
					return false;
				})
			}
		};
	return {
		inte: keyboardE.run,
		appear: keyboardE.appear,
		hide: keyboardE.disAppear
	};
}();

// a标签active的兼容(绑定一个空事件)
$('a').on('touchstart',function(){});

//keyboard,传入响应键盘事件的jq元素对象
keyboardMine.inte($('.goodsCountActi .countGoods'));

//结算相关
confirmGoods.inte();

})
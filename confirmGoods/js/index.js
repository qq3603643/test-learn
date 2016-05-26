$(function(){

var myAlert = function(){
	var alertAppearOnff = !0,
		alertHtml = '<div class="myAlert">'
				   +	'超出数量了额~'
				   +'</div>',

		alertE = {
			layOut: function(){
				$('body').prepend(alertHtml);
			},
			isHaveAlertBox: function(){
				return !!$('.myAlert').size();
			},
			showEvent: function(){
				alertAppearOnff = !1;
				$('.myAlert').css({'display':'block','opacity': '1','transform':'scale(1)'});
				setTimeout(function(){
					$('.myAlert').animate({'scale': '.8'}, 400,function(){
						$('.myAlert').animate({'opacity': '0'},600,function(){
							$('.myAlert').css({'display': 'none'});
							alertAppearOnff = !0;
						})
					})
				}, 600)
			},
			showAlert: function(){
				if( !alertAppearOnff ) return false;
				if(!alertE.isHaveAlertBox()){
					alertE.layOut();
				}
				alertE.showEvent();
			}
		};
	return {
		show: alertE.showAlert
	}
}();

var confirmGoods = function(){
	var  
		$calcBox = $('.calcTotal'),
		confirm = {
		 	InfoHideCountShow: function(){
		 		
		 	},
		 	countHideInfoshow: function(){

		 	},
		 	limitCount: function($ele,maxValue){

		 		var number = $ele.text()*1;
		 		if(number<0) number = 0;
		 		if(number>maxValue){
		 			myAlert.show();
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
	 			confirm.limitCount(countEle,countEle.attr('data-maxCount')*1);
		 	},
		 	run: function(){

		 		//加减按钮
		 		$('.goodsCountActi').off('touchstart').on('touchstart','.countPlus,.countMinus',function(e){
		 			var e = e||window.event;
		 			confirm.amountChangeEvent(e);
		 		})
		 		//toggle冲红按钮
		 	}
		 };

	 return {
	 	'run': confirm.run
	 };
}();

var keyboardMine = function(){
	var 
		self,keyboardAppearOnff = !0,
		index,
		keyboardHtml = 
		'<div class="y-keyboard">'
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

				$('body').append(keyboardHtml);
				$('.y-keyboard').css({
					'top':$(window).height()+$(window).scrollTop(),
					'display':'none'
				})
			},
			appear: function(){		

				$('.calcTotal').css('bottom',$('.calcTotal').height()*-1);
				$('html,body').addClass('banScroll');
				//出现之前先将键盘重置在可见范围下面
				$('.y-keyboard').css({'display':'block',
									  'top':$(window).height()+$(window).scrollTop()
				});
				var target = $(window).height() - $('.y-keyboard').height() + $(window).scrollTop();
				$('.y-keyboard').animate({top: target+'px'}, 300,function(){
					keyboardAppearOnff = !0;
				})
			},
			disAppear: function(){

				//存储现在的scrolltop坐标以备再次初始化时使用
				var nowScrollY = $('.content').attr('style').match(/translate\(\d+px\,\s*((-)?(\d+\.)?\d+)px\)/ig)[0].match(/(\d+\.)?\d+/g)[1];
				nowScrollY*=-1;
				
				//动态隐藏键盘
				var target = $('.y-keyboard').offset().top + $('.y-keyboard').height();
				$('.y-keyboard').animate({top: target+'px'}, 200,function(){
					$('.y-keyboard').css({'display':'none'});
					$('html,body').removeClass('banScroll');
					$('.calcTotal').animate({'bottom':0},200);
				})

				//重新初始化（不能向下拉了）
				myScroll.destroy();
				$('.footer-fix').css('height',parseFloat($('.main').css('padding-top')) + $('footer').height());
				myScroll = new iScroll('wrapper',{ 
							    hScrollbar: false,
							    vScrollbar: false
						     });

				//初始化后恢复置顶
				myScroll.scrollTo(0,nowScrollY,0);
			},
			numberLimit: function($ele,maxValue){
				var value = $ele.text();
				if(value.length==0){
					$ele.text('0');return false;
				}
				value*=1;
				if(value>maxValue){
					myAlert.show();
					$ele.text(maxValue);return false;
				}
				$ele.text(value);
			},
			outPutEvent: function(e){

				var e = e||window.event,
				    targetEle = e.target,
					targetClass = targetEle.className,
					targetTagName = targetEle.tagName;
					if(targetTagName.toLowerCase() !== 'span') return false;
				var nowInputEle = self.eq(index);
				//清除
				if(~targetClass.indexOf('none')){
					nowInputEle.text('');
					return false;
				};
				//完成
				if(~targetClass.indexOf('completed')){
					nowInputEle.removeClass('input-active');
					keyboardE.disAppear();
					keyboardE.numberLimit(nowInputEle,nowInputEle.attr('data-maxCount')*1);
					return false;
				}
				//删除
				if(~targetClass.indexOf('delete')){
					var number = nowInputEle.text();
					number+='';
					if(number.length){ nowInputEle.text(number.substr(0,number.length-1)) };
					return false;
				}
				//数字键
				nowInputEle.text(nowInputEle.text()+$(targetEle).text());
				keyboardE.numberLimit(nowInputEle,nowInputEle.attr('data-maxCount')*1);
			},
			run: function($ele){

				keyboardE.layOut();
				self=$ele;
				
				self.on('touchstart',function(){

					//重新初始化（加大滚动条的最大长度）
					myScroll.destroy();
					$('.footer-fix').css('height',$(window).height());
					myScroll = new iScroll('wrapper', { 
									hScrollbar: false,
									vScrollbar: false
								 });

					//将当前点击的输入框移动至屏幕最上方
					var clickScrollY = $('.content').attr('style').match(/translate\(\d+px\,\s*((-)?(\d+\.)?\d+)px\)/ig)[0].match(/(\d+\.)?\d+/g)[1];
						clickScrollY*=-1;
					var i = $(this).closest('.goodsCountActi').offset().top,
						target = (-i)+$('header').height()+clickScrollY;
					myScroll.scrollTo(0,target,0);

					//呼出键盘
					keyboardAppearOnff && (keyboardE.appear());
					keyboardAppearOnff = !1;

					//键盘输入事件
					index = $.inArray($(this)[0],self);//通过全局的index变量锁定用户当前键盘操作的输入元素
					//index = $(this).closest('.goodsCountActi').index();  
					self.removeClass('input-active').eq(index).addClass('input-active');
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

//scroll初始化
void function(){
	$('.footer-fix').css('height',parseFloat($('.main').css('padding-top')) + $('footer').height());
	myScroll = new iScroll('wrapper', { 
				hScrollbar: false,  //是否显示滚动条
				vScrollbar: false
			 });
}();

//active状态的兼容
$('body').on('touchstart',function(){});

//keyboard,传入响应键盘事件的jq元素对象
keyboardMine.inte($('.goodsCountActi .countGoods'));

//结算列表运行
confirmGoods.run();

})
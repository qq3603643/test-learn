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
		$rushShowEle = $('.calculate-totle').find('.rush'),
		$resultShowEle = $('.calculate-totle').find('.result'),
		$totalOrderPrice = $('.all-order').find('.totalOrderPrice'),
		numberToTwo = function(number){
			number+='';
			if( ~(number.indexOf('.')) ){
			var numberArr = number.split('.'),
			    arrFist = numberArr[0],arrLast = numberArr[1];
			if( arrLast.length==1 ) return arrFist+'.'+arrLast+'0';
			if( arrLast.length==2 ) return number;
			if( arrLast.length>2 ) return Math.round(number*100)/100;
			}
			return number+='.00';
		},
		confirm = {
		 	rushEvent: function(e){
		 		var e = e||window.event,text=e.target.innerHTML,
		 			$actEle = $(this).parent().siblings('.goodsCountAction'),
		 			$detailsEle = $(this).parent().siblings('.goodsItem-details'),
		 			$inputEle = $actEle.find('.countGoods');
	 			//点击冲红
		 		if(text=='发起冲红'){
		 			$inputEle.val($inputEle.attr('data-maxCount'));
		 			$actEle.show();
		 			$detailsEle.hide();
		 			$(this).text('取 消');
		 			return false;
		 		}
		 		//点击取消
		 			$inputEle.attr('data-nowCount',$inputEle.attr('data-maxCount'));
		 			$actEle.hide();
		 			$detailsEle.show();
		 			$inputEle.removeClass('input-active');
		 			$(this).text('发起冲红');
		 			confirm.moneyCalcEvent();
		 	},
		 	headShrinkEvent: function(e){
		 		var e = e||window.event,
		 			classStr = e.target.className,
		 			$shrinkEle = $(this).siblings('.address-details');
		 		if(~classStr.indexOf('open')){
		 			e.target.className = 'shrink-close'; 
		 			$shrinkEle.height('0px');
		 		}
		 		else {
		 			e.target.className = 'shrink-open';
		 			$shrinkEle.height($shrinkEle.attr('realHeight'));
		 		}
		 		myScroll.destroy();
		 		myScroll = new iScroll('wrapper', { 
								hScrollbar: false,  //是否显示滚动条
								vScrollbar: false,
								bounce: false  //禁止上下超出时的反弹
							   });
		 	},
		 	shrinkEvent: function(e){
		 		var e = e||window.event,
		 			classStr = e.target.className,
		 			$ul = $(this).parent().siblings('ul');
		 		if(~classStr.indexOf('open')){
		 			e.target.className = 'shrink-close'; 
		 			$ul.height('0px');
		 			
		 		}
		 		else {
		 			e.target.className = 'shrink-open';
		 			$ul.height($ul.attr('realHeight'));
		 		}
		 		myScroll.destroy();
		 		myScroll = new iScroll('wrapper', { 
								hScrollbar: false,  //是否显示滚动条
								vScrollbar: false,
								bounce: false  //禁止上下超出时的反弹
							   });
		 	},
		 	limitCount: function($ele,maxValue){

		 		var number = $ele.val()*1;
		 		if(number<0) number = 0;
		 		if(number>maxValue){
		 			myAlert.show();
		 			number = maxValue;
		 		}
		 		$ele.val(number);
		 	},
		 	amountLayOut: function(){
		 		$.each($('.countGoods'),function(i,item){
		 			$(item).attr('data-nowCount',$(item).attr('data-maxCount'));
		 		})
		 		$rushShowEle.attr('startMoney',$rushShowEle.text());
		 		$resultShowEle.attr('startMoney',$resultShowEle.text());
		 		$totalOrderPrice.attr('startMoney',$totalOrderPrice.text());
		 		$.each($('.goodsList ul'),function(i,item){
		 			$(item).attr('data-realHeight',$(item).height());
		 		})
		 		$('.address-details').attr('data-realHeight',$('.address-details').height());
		 	},
		 	moneyCalcEvent: function(){
		 		var resultReduce=0,rushAdd=0;

		 		$.each($('.countGoods'),function(i,item){
		 			rushAdd += ($(item).attr('data-maxCount')*1-$(item).attr('data-nowCount')*1)*$(item).attr('data-price');
		 			if(!$(item).parent().siblings('.goodsItem-details').find('.free-goods').size()){
		 				resultReduce += ($(item).attr('data-maxCount')*1-$(item).attr('data-nowCount')*1)*$(item).attr('data-price');
		 			}
		 		})
		 		$rushShowEle.text(numberToTwo($rushShowEle.attr('startmoney')*1+rushAdd));
		 		$resultShowEle.text(numberToTwo($resultShowEle.attr('startmoney')*1-resultReduce));
		 		$totalOrderPrice.text(numberToTwo($totalOrderPrice.attr('startmoney')*1-resultReduce));
		 	},
		 	amountChangeEvent: function(e){

		 		var e = e||window.event;
		 			_this = $(e.target),
		 			countEle = _this.siblings('.countGoods'),
		 			targetClass = e.target.className,
		 			number = countEle.val()*1;

	 			//增加
	 			if(~targetClass.indexOf('countPlus')){
	 				countEle.val(number+1);
	 			}
	 			//减少
	 			if(~targetClass.indexOf('countMinus')){
	 				countEle.val(number-1);
	 			}
	 			confirm.limitCount(countEle,countEle.attr('data-maxCount')*1);
	 			countEle.attr('data-nowCount',countEle.val());
	 			confirm.moneyCalcEvent();
		 	},
		 	run: function(){

		 		//初始化nowCount
		 		confirm.amountLayOut();
		 		//加减按钮
		 		$('.goodsCountAction').off('touchstart').on('touchstart','.countPlus,.countMinus',confirm.amountChangeEvent);
		 		//冲红按钮
		 		$('.rushRed-btn').on('touchstart',confirm.rushEvent);
		 		//收缩按钮
		 		$('.goodsList .title').on('touchstart','i',confirm.shrinkEvent);
		 		$('header').on('touchstart','i',confirm.headShrinkEvent);
		 	}
		 };

	 return {
	 	'run': confirm.run,
	 	'moneyCalcEvent': confirm.moneyCalcEvent
	 };
}();

//键盘监听
var keyboardWatch = function(){
	var $ele,
		keyboardE={
			moveToTop:function(){
				var clickScrollY = $('.content').attr('style').match(/translate\(\d+px\,\s*((-)?(\d+\.)?\d+)px\)/ig)[0].match(/(\d+\.)?\d+/g)[1],
					i = $(this).closest('.goodsCountAction').offset().top;
					clickScrollY*=-1;
					target = (-i)+clickScrollY+10;

				myScroll.scrollTo(0,target,0);
			},
			limitCount: function(){
				var maxCount = $(this).attr('data-maxCount')*1,
					number = $(this).val();
				if(number>maxCount) number=maxCount;
				if(number.val()<0) number=0;
				$(this).val(number);
		 	},
			run:function(eles){
				$ele = eles;
				$ele.on({
					'focus':keyboardE.moveToTop,
					'blur':keyboardE.limitCount
				});
			}
		};

	return {
		inte: keyboardE.run
	};
}();

//scroll初始化
void function(){
	myScroll = new iScroll('wrapper', { 
				hScrollbar: false,  //是否显示滚动条
				vScrollbar: false,
				bounce: false  //禁止上下超出时的反弹
			 });
}();

//active状态的兼容
$('body').on('touchstart',function(){});

//keyboard监听 传入响应键盘事件的jq元素对象
keyboardWatch.inte('.goodsCountAction .countGoods');

//结算列表运行
confirmGoods.run();

})
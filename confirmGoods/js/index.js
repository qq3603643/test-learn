
var myAlert = function(){

	var alertAppearOnff = !0,
		alertHtml = '<div class="myAlert">'
				   +'</div>',
		alertE = {
			layOut: function(){

				$('body').prepend(alertHtml);
			},
			isHaveAlertBox: function(){

				return !!$('.myAlert').size();
			},
			showEvent: function(str){

				alertAppearOnff = !1;
				str && ($('.myAlert').html(str),true) || ($('.myAlert').html('超出数量了额~'));
				$('.myAlert').css({
					'display':'block',
					'opacity': '1',
					'-webkit-transform':'scale(1)',
					'transform':'scale(1)',
					'top': $(window).scrollTop()+($(window).height()-$('.myAlert').height())/2 +'px'
				});
				setTimeout(function(){
					$('.myAlert').animate({'scale': '.8'}, 400,function(){
						$('.myAlert').animate({'opacity': '0'},600,function(){
							$('.myAlert').css({'display': 'none'});
							alertAppearOnff = !0;
						})
					})
				}, 600)
			},
			showAlert: function(str){

				if( !alertAppearOnff ) return false;
				if(!alertE.isHaveAlertBox()){
					alertE.layOut();
				}
				alertE.showEvent(str);
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
		phoneIs = function(){

			var u = navigator.userAgent;
			if(~u.indexOf('Android') || ~u.indexOf('Adr')) return 'Android';
			if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || ~u.indexOf('iPhone') || ~u.indexOf('iPad')) return 'ios';
			return false;
		},
		confirm = {

			bindOnff: function(){
				$('.rushRed-btn').attr('rushOnff','1');
			},
		 	rushEvent: function(e){

		 		var e = e||window.event,text=e.target.innerHTML,
		 			rushOnff=$(this).attr('rushOnff')*1,
		 			$actEle = $(this).parent().siblings('.goodsCountAction'),
		 			$detailsEle = $(this).parent().siblings('.goodsItem-details'),
		 			$inputEle = $actEle.find('.countGoods');
	 			//点击冲红
		 		if(rushOnff){
		 			$inputEle.val($inputEle.attr('data-maxCount'));
		 			$actEle.show();
		 			$detailsEle.hide();
		 			$(this).text('取   消').attr('rushOnff','0');
		 			return false;
		 		}
		 		//点击取消
		 			$inputEle.attr('data-nowCount',$inputEle.attr('data-maxCount'));
		 			$actEle.hide();
		 			$detailsEle.show();
		 			$inputEle.removeClass('input-active');
		 			$(this).text('发起冲红').attr('rushOnff','1');
		 			confirm.moneyCalcEvent();
		 	},
		 	//按理应该把收缩功能新建对象的.....
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
		 			$shrinkEle.height('auto');
		 		}
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
		 			$ul.height('auto');
		 		}
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
		 	amountAndHeightLayOut: function(){

		 		$.each($('.countGoods'),function(i,item){
		 			$(item).attr('data-nowCount',$(item).attr('data-maxCount'));
		 		})
		 		$rushShowEle.attr('startMoney',$rushShowEle.text());
		 		$resultShowEle.attr('startMoney',$resultShowEle.text());
		 		$totalOrderPrice.attr('startMoney',$totalOrderPrice.text());
		 	},
		 	moneyCalcEvent: function(){

		 		var resultReduce=0,rushAdd=0;

		 		$.each($('.countGoods'),function(i,item){

		 			if(!$(item).parent().siblings('.goodsItem-details').find('.free-goods').size()){
		 				rushAdd += ($(item).attr('data-maxCount')*1-$(item).attr('data-nowCount')*1)*$(item).attr('data-price');
		 				resultReduce += ($(item).attr('data-maxCount')*1-$(item).attr('data-nowCount')*1)*$(item).attr('data-price');
		 			}
		 		})
		 		$rushShowEle.text(numberToTwo($rushShowEle.attr('startmoney')*1+rushAdd));
		 		$resultShowEle.text(numberToTwo($resultShowEle.attr('startmoney')*1-resultReduce));
		 		$totalOrderPrice.text(numberToTwo($totalOrderPrice.attr('startmoney')*1-resultReduce));
		 	},
		 	amountChangeEvent: function(e){

		 		var e = e||window.event,
		 			_this = $(e.target),
		 			countEle = _this.siblings('.countGoods'),
		 			targetClass = e.target.className,
		 			number = countEle.val()*1;
		 		if(isNaN(number)) number=0;
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
		 	postData: function(str){

		 		var data=[];
		 		$.each($('.all-order .goodsItem-order'),function(i,item){
		 			var dataItem={};
		 			dataItem.goodsId = $(item).attr('data-goodsId');
		 			dataItem.shipmentId = $(item).attr('data-shipmentId');
		 			dataItem.isGift = !!$(item).find('.free-goods').size();
		 			dataItem.totalCount = $(item).find('.countGoods').attr('data-maxCount');
		 			dataItem.receivedCount = $(item).find('.countGoods').attr('data-nowCount');
		 			data.push(dataItem);
		 		})
		 		//console.log(data);
		 		if(phoneIs()=='Android'){
		 			if(str&&str=='1'){
		 				return data;
		 			}else {
		 				window.jsBridge.injectResult(JSON.stringify(data));
		 			}
		 		}
		 		if(phoneIs()=='ios'){
		 			return data;
		 		}

		 	},
		 	run: function(){

		 		//按钮绑定onff
		 		confirm.bindOnff();
		 		//初始化nowCount.记录收缩原始高度
		 		confirm.amountAndHeightLayOut();
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
	 	'inte': confirm.run,
	 	'moneyCalcEvent': confirm.moneyCalcEvent,
	 	'postData': confirm.postData,
	 	'phoneIs': phoneIs,
	 };
}();

//键盘监听
var keyboardWatch = function(){

	var $ele,timerInputChange,timerBlur,
		keyboardE={
			moveToTop: function(){

				//$(window).scrollTop($(this).closest('.goodsCountAction').offset().top-10);
				$ele.removeClass('input-active');
				$(this).addClass('input-active');
			},
			limitCount: function(){

				//防止当聚焦的时候点击输入框 会有class移出马上又加上的闪动
				clearTimeout(timerBlur);
				timerBlur = setTimeout(function(){
					$ele.removeClass('input-active');
				}, 29)

				var maxCount = $(this).attr('data-maxCount')*1,
					number = $(this).val();
				if(number==''||number=='全部收货'){
					$(this).val(maxCount).attr('data-nowCount',maxCount);
					confirmGoods.moneyCalcEvent();
				}
				$(this).removeClass('palceHolder');
		 	},
		 	valueCheck: function(){

		 		clearTimeout(timerInputChange);
		 		var _this = $(this);
		 		timerInputChange = setTimeout(function(){
		 			var value=_this.val(),
		 				re = /[^0-9]/g;
			 		if(value==''){
			 			_this.addClass('palceHolder').val('全部收货');
			 			_this.attr('data-nowcount',_this.attr('data-maxCount'));
			 			return;
			 		}
			 		_this.removeClass('palceHolder');
			 		if(re.test(value)){
			 			if(! ~value.indexOf('全')){
			 				myAlert.show('只能输入数字额~');
			 			}
			 			value = value.split(re).join('');
			 		}
			 		value*=1;
			 		if(value==''||value<0) value=0;
			 		if(value>_this.attr('data-maxCount')*1){
			 			myAlert.show();
			 			value=_this.attr('data-maxCount');
			 		}
			 		_this.val(value).attr('data-nowCount',value);
			 		confirmGoods.moneyCalcEvent();
		 		},66)
		 	},
			run:function(eles){

				$ele = eles;
				$ele.on({
					'focus':keyboardE.moveToTop,
					'input propertychange':keyboardE.valueCheck,
					'blur':keyboardE.limitCount,
				});
				$('body').on('touchstart',function(){
					$ele.blur();
				})
			}
		};

	return {
		inte: keyboardE.run
	};
}();

//active状态的兼容
$('body').on('touchstart',function(){});

//keyboard监听 传入响应键盘事件的jq元素对象
keyboardWatch.inte($('.goodsCountAction .countGoods'));

//结算运行
confirmGoods.inte();

//IOS定义的方法
if(confirmGoods.phoneIs()=='ios'){

	var setupWebViewJavascriptBridge = function(callback){
	    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
	    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
	    window.WVJBCallbacks = [callback];
	    var WVJBIframe = document.createElement('iframe');
	    WVJBIframe.style.display = 'none';
	    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	    document.documentElement.appendChild(WVJBIframe);
	    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
	};

	setupWebViewJavascriptBridge(function(bridge) {
	    bridge.registerHandler('OC2JS_GetDataForReceiveOrder', function(data, responseCallback) {
	        console.log("JS Echo called with:", data)
	        var result = confirmGoods.postData();
	        responseCallback(result)
	    })
	})
}
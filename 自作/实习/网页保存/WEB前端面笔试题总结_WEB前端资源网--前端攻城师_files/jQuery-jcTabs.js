/*
 * jQuery - jcTabs v2.1
 * Copyright(c) 2012 by Adam’
 * Date: 2012-08-27
 * qq : 1741498
 */
;(function($){
	$.fn.jcTabs = function(options) {
		var defaults = {
			selectClass:'select',        //设置tabs选项跟进class名
			Event:'mouseover',				 //设置tabs选项事件设置，提供click,mouseover等
			speed:"fast",                //图片切换速度设置，提供easing值 或 数值(mm)
			autoPlay : false,            //是否开起自动播放功能，提供true,false
			autoTime : 2000,             //自动播放间隔时间(mm)
			Default:0,                   //设置默认显示tabs选项
			fadeOut: 0,                  //内容是否隐现效果，提供easing值 或 数值(mm)
			Scroll:false,                //是否内容滚动，提供true,false
			Direction:"x",               //内容滚动方向，提供x,y
			arrow:false,                 //是否开起左右按钮，提供true,false
			arrowOffset:{                //设置左右按钮的x,y偏移
				x : 0,
				y : 0	
			},
			mode:"text",                 //提供3种模式：iframe,ajax,text
			setAjax : {                  //ajax相关设置：ajaxPath绑定属性，dataType文本类型，type传输方式，contentType传输类型，cache缓存，timeOutInfo自定义超时信息，ErrorInfo自定义错误信息
				ajaxPath:"rel",
				dataType:"html",
				type:"GET",
				contentType: "application/json;utf-8",
				cache : false,
				timeOutInfo : "The Page Timeout, check the cause of the error!",
				ErrorInfo : "The Page Error, check the cause of the error!"
			}
		};
		var options = $.extend(defaults,options);
		return this.each(function(i,t) {
			var $this = $(this),
			    _self = this,
		    	_idx = 0,
			    nDef = options.Default - 1,
				Select = options.selectClass,
			    $tabsList = $("#tabsList",$this),
				$tabsLi = $tabsList.find("li"),
				nTabsLiLen = $tabsLi.length, 
				$tabsCon = $("div[bind=\"tabsCon\"]",$this),
				$tabsConDiv = $tabsCon.children();
			//初始化内容
			$tabsLi.eq(nDef).addClass(Select);
			$tabsConDiv.eq(nDef).fadeIn(options.speed);
			var $wraper = $("#wraper",$this),
				wrapWidth =  $wraper.outerWidth(true),
				wrapHeight =  $wraper.outerHeight(true),
				fnPos = function(val,pos){
					for(var c = 0; c < nTabsLiLen; c++){
						var oThisDiv = $tabsConDiv.eq(c);
						oThisDiv.css(pos,c*val).show();
					};
					if(pos == "left"){
						$tabsCon.width("999%");
					} else if(pos == "top"){
						$tabsCon.height("999%");
					} else {
						alert("Pos Error !")		
					};
					return false;
				};
			if(options.mode == "ajax"){
				fnAjax();
			} else if(options.mode == "iframe"){
				fnIframe();
				options.Scroll = false;
			};
			//左右按钮
			if(options.arrow && options.Scroll){
				$this.prepend("<div id=\"prev\" class=\"jcPrev\" style=\"display:none;\"></div><div id=\"next\" class=\"jcNext\" style=\"display:none;\"></div>");
				var $prev = $("#prev",$this),
					$next = $("#next",$this),
					nextWidth = $next.width();
				$prev.css({"left":0-options.arrowOffset.x,"top":0+options.arrowOffset.y})
					 .show()
					 .bind("click",function(e){
						if(_idx <= 0 ){
							_idx = nTabsLiLen - 1;
						} else {
							_idx -= 1;
						};
						$tabsLi.eq(_idx).addClass(Select).siblings().removeClass(Select);
						fnDirection(_idx);
					 });
				$next.css({"left":(wrapWidth-nextWidth)+options.arrowOffset.x,"top":0+options.arrowOffset.y})
					 .show()
					 .bind("click",function(e){
						if(_idx >= nTabsLiLen - 1 ){
							_idx = 0;
						} else {
							_idx += 1;
						};
						$tabsLi.eq(_idx).addClass(Select).siblings().removeClass(Select);
						fnDirection(_idx);
					 });
			};
			if(options.Scroll){
				if(options.Direction == "x"){
					fnPos(wrapWidth,"left");
				} else if(options.Direction == "y"){
					fnPos(wrapHeight,"top");
				};
			};
			$tabsLi.bind(options.Event,function(e){
				_idx = $(e.target).index();
				$(this).addClass(Select).siblings().removeClass(Select);
				var o = new tabsMode($tabsConDiv,_idx);
				o.setMode(options.mode);
			});
			//自动播放功能
			if(options.autoPlay){
				function oPlay(){
					if(_idx >= nTabsLiLen - 1 ){
						_idx = 0;
					} else {
						_idx += 1;
					};
					$tabsLi.eq(_idx).addClass(Select).siblings().removeClass(Select);
					tabsSwitch($tabsLi,_idx);
				};
				var Auto = setInterval(oPlay,options.autoTime);
				$this.hover(function(){
					clearInterval(Auto);
				},function(){
					Auto = setInterval(oPlay,options.autoTime);
				})
			};
			//功能方法
			var tabsMode = function($Dom,index){
				this.text = function(){
					tabsSwitch($Dom,index);
					return false;
				};
				this.ajax = function(){
					tabsSwitch($Dom,index);
					return false;
				};
				this.iframe = function(){
					tabsSwitch($Dom,index);
					return false;
				};
				return false;
			};
			tabsMode.prototype.setMode = function(mode){
				this[mode]();
			};
			//基本文本功能
			function fnDirection(index){
				if(options.Scroll){
					//判断滚动方向
					if(options.Direction == "x"){
						$tabsCon.stop().animate({"left":-index*wrapWidth},options.speed);
					} else if(options.Direction == "y"){
						$tabsCon.stop().animate({"top":-index*wrapHeight},options.speed);
					} else {
						alert("Direction Error !")	
					};
				};
				return false;
			};
			function tabsSwitch(Dom,index){
				//判断是否滚动
				if(options.Scroll){
					fnDirection(index);
				} else {
					if(options.fadeOut != undefined){
						Dom.eq(index).fadeIn(options.speed).siblings().fadeOut(options.fadeOut);	
					} else {
						Dom.eq(index).show().siblings().hide();		
					};
				};
				return false;
			};
			//ajax同域调页面功能
			function fnAjax(){
				for(var d = 0; d < nTabsLiLen; d++){
					var oThisDiv = $tabsConDiv.eq(d),
						thisPath = oThisDiv.attr(options.setAjax.ajaxPath);
					$.ajax({
						url: thisPath + "?code=" + new Date().getTime(),
						context: _self,
						timeout : 3000,
						cache : options.setAjax.cache,
						async : true,
						global : true,
						contentType:options.setAjax.contentType,
						crossDomain: false,
						type: options.setAjax.type,
						dataType : options.setAjax.dataType,
						error: function(jqXHR, textStatus, errorThrown){ 
							oThisDiv.removeClass("loading");
							if(textStatus == "timeout") {
								oThisDiv.css({"line-height":wrapHeight-25+"px","text-align":"center"})
										.html(options.setAjax.timeOutInfo);
							} else if(textStatus == "error"){
								oThisDiv.css({"line-height":wrapHeight-25+"px","text-align":"center"})
										.html(options.setAjax.ErrorInfo);
							};
						},
						beforeSend: function(jqXHR, settings){
							oThisDiv.addClass("loading");
						},
						success: function(data, textStatus, jqXHR){
							oThisDiv.removeClass("loading");
							$("div[bind=\"tabsCon\"]",$this).find("div:eq(" + d + ")").html(data);
							return false;
							
						}
					});
				};
				return false;
			};
			////iframe跨域调页面功能
			function fnIframe(){
				for(var d = 0; d < nTabsLiLen; d++){
					var oThisDiv = $tabsConDiv.eq(d),
						thisPath = oThisDiv.attr("url"),
						thisWidth = oThisDiv.attr("width"),
						thisHeight = oThisDiv.attr("height");
					oThisDiv.html("<iframe src=\"" + thisPath + "\" width=\"" + thisWidth + "\" height=\"" + thisHeight + "\" frameborder=\"0\" ></iframe>");
				};
				return false;
			};
			return false;
		});
	};
})(jQuery)
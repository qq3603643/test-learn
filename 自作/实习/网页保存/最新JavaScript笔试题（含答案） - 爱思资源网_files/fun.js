//百度自动推送
(function(){
    var bp = document.createElement('script');
    bp.src = '//push.zhanzhang.baidu.com/push.js';
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();

//延时加载
 $(function () { 
	$("img.lazy").lazyload({
		placeholder : "/images/grey.gif",   
		effect : "fadeIn"
	}); 
});


//点击页面计算点击次数
var clickCount = 0, $i=$('<b>');
$i.css({
'z-index':99999,
'position':'absolute',
'color':'red',
'display':'none'
});
$('body').append($i);
$(document).on('click',function(e){
var x = e.pageX, y = e.pageY;
$i.text('+'+(++clickCount)).css({
'display':'block',
'top':y-15,
'left':x,
'opacity':1

}).stop(true,false).animate({
'top':y-180,
'opacity':0
},800,function(){
$i.hide();
});
e.stopPropagation();
})

//返回顶部
 $(function(){
 	    $(window).scroll(function(){
	      if($(window).scrollTop() >600){
	       		$('.aTop').css({display:'block'});
	      }else{
	         $('.aTop').css({display:'none'});	
	      }
    });
 	    $('.aTop').click(function(){
	       			$('body,html').animate({scrollTop:0},600);
					return false;
	       		});
  });

	//添加收藏
	function AddFavorite(sURL,sTitle) {
	try{
	window.external.addFavorite(sURL, sTitle);
	}
	catch(e){
	try{
	window.sidebar.addPanel(sTitle,	sURL, "");
	}
	catch(e){
	alert("加入收藏失败，请使用Ctrl+D进行添加");
	}
	}
	}
	//跟随判断
	 $().ready(function(){
   $(window).scroll(function(){
		if($(this).scrollTop()>1800){
			$('#asc').addClass('fixed');
		}else{
			$('#asc').removeClass('fixed');
		}
	});
   });
   
 
//二维码客户端
	var midBar=Math.floor((document.documentElement.clientHeight||document.body.clientHeight)/2)-80;
	
	function showHideBar(){
	var cHeight=document.documentElement.clientHeight||document.body.clientHeight;
	var scrollHeight=document.documentElement.scrollTop||document.body.scrollTop;
	if(scrollHeight>cHeight){
		document.getElementById("cbnews").style.display='block';
	}else{
		document.getElementById("cbnews").style.display='none';
	}
	midBar=Math.floor(cHeight/2)-80;
	document.getElementById("cbnews").style.top =midBar+'px';
	
	}
	window.onscroll = showHideBar;
		window.resize = showHideBar;
	
	var isIE6 = ! -[1, ] && !window.XMLHttpRequest;
	if (isIE6) {		
		function hoverBar() {
			
			var h=document.documentElement.scrollTop + midBar;
			document.getElementById("cbnews").style.top =h+ "px";

		}
		window.onscroll = hoverBar;
		window.resize = hoverBar;
	}
	document.getElementById("gotop").onclick=function(){
		document.documentElement.scrollTop=0;
		document.body.scrollTop=0;
	}

	//轮播效果
$(function() {

	var sWidth = $("#focus").width(); //获取焦点图的宽度（显示面积）

	var len = $("#focus ul li").length; //获取焦点图个数

	var index = 0;

	var picTimer;

	

	//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮

	var btn = "<div class='btnBg'></div><div class='button'>";

	for(var i=0; i < len; i++) {

		btn += "<span></span>";

	}

	btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";

	$("#focus").append(btn);

	$("#focus .btnBg").css("opacity",0.5);



	//为小按钮添加鼠标滑入事件，以显示相应的内容

	$("#focus .button span").css("opacity",0.4).mouseenter(function() {

		index = $("#focus .button span").index(this);

		showPics(index);

	}).eq(0).trigger("mouseenter");



	//上一页、下一页按钮透明度处理

	$("#focus .preNext").css("opacity",0.2).hover(function() {

		$(this).stop(true,false).animate({"opacity":"0.5"},300);

	},function() {

		$(this).stop(true,false).animate({"opacity":"0.2"},300);

	});



	//上一页按钮

	$("#focus .pre").click(function() {

		index -= 1;

		if(index == -1) {index = len - 1;}

		showPics(index);

	});



	//下一页按钮

	$("#focus .next").click(function() {

		index += 1;

		if(index == len) {index = 0;}

		showPics(index);

	});



	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度

	$("#focus ul").css("width",sWidth * (len));

	

	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放

	$("#focus").hover(function() {

		clearInterval(picTimer);

	},function() {

		picTimer = setInterval(function() {

			showPics(index);

			index++;

			if(index == len) {index = 0;}

		},4000); //此4000代表自动播放的间隔，单位：毫秒

	}).trigger("mouseleave");

	

	//显示图片函数，根据接收的index值显示相应的内容

	function showPics(index) { //普通切换

		var nowLeft = -index*sWidth; //根据index值计算ul元素的left值

		$("#focus ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position

		//$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果

		$("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果

	}

});


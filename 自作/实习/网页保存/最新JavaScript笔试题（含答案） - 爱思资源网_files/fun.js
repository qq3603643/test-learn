//�ٶ��Զ�����
(function(){
    var bp = document.createElement('script');
    bp.src = '//push.zhanzhang.baidu.com/push.js';
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();

//��ʱ����
 $(function () { 
	$("img.lazy").lazyload({
		placeholder : "/images/grey.gif",   
		effect : "fadeIn"
	}); 
});


//���ҳ�����������
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

//���ض���
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

	//����ղ�
	function AddFavorite(sURL,sTitle) {
	try{
	window.external.addFavorite(sURL, sTitle);
	}
	catch(e){
	try{
	window.sidebar.addPanel(sTitle,	sURL, "");
	}
	catch(e){
	alert("�����ղ�ʧ�ܣ���ʹ��Ctrl+D�������");
	}
	}
	}
	//�����ж�
	 $().ready(function(){
   $(window).scroll(function(){
		if($(this).scrollTop()>1800){
			$('#asc').addClass('fixed');
		}else{
			$('#asc').removeClass('fixed');
		}
	});
   });
   
 
//��ά��ͻ���
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

	//�ֲ�Ч��
$(function() {

	var sWidth = $("#focus").width(); //��ȡ����ͼ�Ŀ�ȣ���ʾ�����

	var len = $("#focus ul li").length; //��ȡ����ͼ����

	var index = 0;

	var picTimer;

	

	//���´���������ְ�ť�Ͱ�ť��İ�͸������������һҳ����һҳ������ť

	var btn = "<div class='btnBg'></div><div class='button'>";

	for(var i=0; i < len; i++) {

		btn += "<span></span>";

	}

	btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";

	$("#focus").append(btn);

	$("#focus .btnBg").css("opacity",0.5);



	//ΪС��ť�����껬���¼�������ʾ��Ӧ������

	$("#focus .button span").css("opacity",0.4).mouseenter(function() {

		index = $("#focus .button span").index(this);

		showPics(index);

	}).eq(0).trigger("mouseenter");



	//��һҳ����һҳ��ť͸���ȴ���

	$("#focus .preNext").css("opacity",0.2).hover(function() {

		$(this).stop(true,false).animate({"opacity":"0.5"},300);

	},function() {

		$(this).stop(true,false).animate({"opacity":"0.2"},300);

	});



	//��һҳ��ť

	$("#focus .pre").click(function() {

		index -= 1;

		if(index == -1) {index = len - 1;}

		showPics(index);

	});



	//��һҳ��ť

	$("#focus .next").click(function() {

		index += 1;

		if(index == len) {index = 0;}

		showPics(index);

	});



	//����Ϊ���ҹ�����������liԪ�ض�����ͬһ�����󸡶�������������Ҫ�������ΧulԪ�صĿ��

	$("#focus ul").css("width",sWidth * (len));

	

	//��껬�Ͻ���ͼʱֹͣ�Զ����ţ�����ʱ��ʼ�Զ�����

	$("#focus").hover(function() {

		clearInterval(picTimer);

	},function() {

		picTimer = setInterval(function() {

			showPics(index);

			index++;

			if(index == len) {index = 0;}

		},4000); //��4000�����Զ����ŵļ������λ������

	}).trigger("mouseleave");

	

	//��ʾͼƬ���������ݽ��յ�indexֵ��ʾ��Ӧ������

	function showPics(index) { //��ͨ�л�

		var nowLeft = -index*sWidth; //����indexֵ����ulԪ�ص�leftֵ

		$("#focus ul").stop(true,false).animate({"left":nowLeft},300); //ͨ��animate()����ulԪ�ع������������position

		//$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //Ϊ��ǰ�İ�ť�л���ѡ�е�Ч��

		$("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //Ϊ��ǰ�İ�ť�л���ѡ�е�Ч��

	}

});

